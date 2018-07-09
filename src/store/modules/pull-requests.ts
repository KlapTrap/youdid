import { Module, ActionTree } from 'vuex';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import gql from 'graphql-tag';

export interface IPullRequests {
  [userId: string]: IPullRequest;
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

export class PullRequestModule
  implements Module<IPullRequests, IPullRequest[]> {
  public actions: ActionTree<IPullRequests, IPullRequest[]> = {
    fetch({ commit, state }, { repo }: { repo: string }) {
      gitHubGraphQLClient
        .execute({
          query: gql`
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
          }`
        })
        .subscribe(pullRequest => {
          commit('addPullRequest', {
            repo,
            pullRequest: pullRequest.data ? pullRequest.data.search.edges : []
          });
        });
    }
  };
  public mutations = {
    addPullRequest(
      state: IPullRequests = {},
      { repo, pullRequest }: { repo: string; pullRequest: IPullRequest }
    ) {
      state = {
        ...state,
        [repoId]: pullRequest
      };
    }
  };
}
