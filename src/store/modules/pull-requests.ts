import { Module, ActionTree } from 'vuex';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import gql from 'graphql-tag';
import Vue from 'vue';
import { AppState } from '@/store';

export const FETCH_PULL_REQUESTS = 'pullRequests/fetch';

export interface IPullRequests {
  [repoId: string]: IPullRequest[];
}

export interface IPullRequest {
  node: {
    id: string;
    title: string;
    state: string;
    updatedAt: string;
    url: string;
    comments: {
      totalCount: number;
      nodes: Array<{
        author: {
          login: string;
        };
      }>;
    };
    author: {
      resourcePath: string;
      url: string;
      avatarUrl: string;
      login: string;
    };
  };
}
function getISO(date: Date) {
  return (
    date.getUTCFullYear() +
    '-' +
    pad(date.getUTCMonth() + 1) +
    '-' +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    ':' +
    pad(date.getUTCMinutes()) +
    ':' +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}
function pad(num: number) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}
class PullRequestModule implements Module<IPullRequests, AppState> {
  public actions: ActionTree<IPullRequests, AppState> = {
    [FETCH_PULL_REQUESTS]: (
      { commit, state },
      { repo, time = this.defaultDate }: { repo: string; time: string },
    ) => {
      gitHubGraphQLClient
        .execute({
          query: gql`
          {
            search(query:"repo:${repo} is:pr author:KlapTrap updated:>${time}", first: 100, type: ISSUE) {
              edges {
                node {
                  ... on PullRequest {
                    title
                    number
                    state
                    updatedAt
                    url
                    comments (last: 1) {
                      totalCount
                      nodes {
                        author {
                        	login
                      	}
                      }
                    }
                  }
                }
              }
            }
          }`,
        })
        .subscribe(response => {
          commit('addPullRequest', {
            repo,
            pullRequests: response.data ? response.data.search.edges : [],
          });
        });
    },
  };

  public mutations = {
    addPullRequest(
      state: IPullRequests = {},
      { repo, pullRequests }: { repo: string; pullRequests: IPullRequest },
    ) {
      Vue.set(state, repo, pullRequests);
    },
  };

  public getters = {
    getRepoPullRequests: (state: IPullRequests) => (repo: string) =>
      state[repo],
  };

  private defaultDate = this.getDefaultDate();

  private getDefaultDate() {
    const today = new Date();
    return getISO(new Date(today.setDate(today.getDate() - 14)));
  }
}

export const pullRequest = new PullRequestModule();
