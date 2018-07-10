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
  id: string;
  state: string;
  updatedAt: string;
  author: {
    resourcePath: string;
    url: string;
    avatarUrl: string;
    login: string;
  };
}

class PullRequestModule implements Module<IPullRequests, AppState> {
  public actions: ActionTree<IPullRequests, AppState> = {
    [FETCH_PULL_REQUESTS]: ({ commit, state }, { repo }: { repo: string }) => {
      gitHubGraphQLClient
        .execute({
          query: gql`
          {
            search(query:"repo:${repo} updated:>2016-11-16T00:00:00Z", first: 100, type: ISSUE) {
              edges {
                node {
                  ... on PullRequest {
                    number
                    state
                    updatedAt
                    author {
                      resourcePath
                      url
                      avatarUrl
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
}

export const pullRequest = new PullRequestModule();
