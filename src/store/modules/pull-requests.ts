import { Module, ActionTree } from 'vuex';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import gql from 'graphql-tag';
import Vue from 'vue';
import { AppState } from '@/store';
import { getISO } from '@/modules/helpers';

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
    labels: {
      nodes: [
        {
          color: string;
          name: string;
        }
      ];
    };
    author: {
      resourcePath: string;
      url: string;
      avatarUrl: string;
      login: string;
    };
  };
}

class PullRequestModule implements Module<IPullRequests, AppState> {
  public actions: ActionTree<IPullRequests, AppState> = {
    [FETCH_PULL_REQUESTS]: (
      { commit, state },
      {
        repo,
        username,
        time = this.defaultDate,
      }: { repo: string; username: string; time: string },
    ) => {
      gitHubGraphQLClient
        .execute({
          query: gql`
          {
            search(query:"repo:${repo} is:pr author:${username} updated:>${time}", first: 100, type: ISSUE) {
              edges {
                node {
                  ... on PullRequest {
                    title
                    number
                    state
                    updatedAt
                    url
                    labels(first:100) {
                      nodes {
                        color
                        name
                      }
                    }
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
            username,
            pullRequests: response.data ? response.data.search.edges : [],
          });
        });
    },
  };

  public mutations = {
    addPullRequest: (
      state: IPullRequests = {},
      {
        repo,
        username,
        pullRequests,
      }: { repo: string; username: string; pullRequests: IPullRequest },
    ) => {
      Vue.set(state, this.getRepoKey(repo, username), pullRequests);
    },
  };

  public getters = {
    getRepoPullRequests: (state: IPullRequests) => (
      repo: string,
      username: string,
    ) => state[this.getRepoKey(repo, username)],
  };

  private defaultDate = this.getDefaultDate();

  private getRepoKey(repo: string, username: string) {
    return `${repo}/${username}`;
  }

  private getDefaultDate() {
    const today = new Date();
    return getISO(new Date(today.setDate(today.getDate() - 14)));
  }
}

export const pullRequest = new PullRequestModule();
