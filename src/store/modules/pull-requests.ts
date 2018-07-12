import { Module, ActionTree, GetterTree } from 'vuex';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import gql from 'graphql-tag';
import Vue from 'vue';
import { AppState } from '@/store';
import * as moment from 'moment';
import { getISO, getRepoKey } from '@/modules/helpers';

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
    createdAt: string;
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
      { repo, username, date }: { repo: string; username: string; date: Date },
    ) => {
      const dateString = getISO(date as Date);
      gitHubGraphQLClient
        .execute({
          query: gql`
          {
            search(query:"repo:${repo} is:pr author:${username} updated:>${dateString}", first: 100, type: ISSUE) {
              edges {
                node {
                  ... on PullRequest {
                    title
                    number
                    state
                    updatedAt
                    createdAt
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
            dateString,
            pullRequests:
              response.data && response.data.search
                ? response.data.search.edges
                : [],
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
        dateString,
        pullRequests,
      }: {
        repo: string;
        username: string;
        dateString: string;
        pullRequests: IPullRequest;
      },
    ) => {
      Vue.set(state, getRepoKey(repo, username, dateString), pullRequests);
    },
  };

  public getters: GetterTree<IPullRequests, AppState> = {
    getRepoPullRequests: (
      state: IPullRequests,
      getters,
      fullState: AppState,
    ) => {
      const { date, name, username } = fullState.repoDetails;
      const pullRequests = state[getRepoKey(name, username, date)];
      if (!pullRequests) {
        return null;
      }
      const selectedDate = moment(fullState.repoDetails.date).format(
        'MM-DD-YYYY',
      );
      return [...pullRequests].filter(pr => {
        const prDateCreated = moment(pr.node.createdAt).format('MM-DD-YYYY');
        return prDateCreated < selectedDate;
      });
    },
    getCreatedPullRequests: (
      state: IPullRequests,
      getters,
      allState: AppState,
    ) => {
      const { date, name, username } = allState.repoDetails;
      const dateSelection = moment(date);
      const pullRequests = state[getRepoKey(name, username, date)];
      if (!pullRequests) {
        return null;
      }
      return [...pullRequests]
        .filter(pr => {
          const prDate = moment(pr.node.createdAt);
          return prDate > dateSelection;
        })
        .sort((pra, prb) => {
          const praDate = moment(pra.node.createdAt);
          const prbDate = moment(prb.node.createdAt);
          if (praDate < prbDate) {
            return 1;
          }
          if (praDate > prbDate) {
            return -1;
          }

          return 0;
        });
    },
  };
}

export const pullRequest = new PullRequestModule();
