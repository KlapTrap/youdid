import { Module, ActionTree } from 'vuex';
import { AppState } from '@/store';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import gql from 'graphql-tag';
import Vue from 'vue';

export const FETCH_REPO_USERS = 'repo-users/fetch';

export interface IRepoUsers {
  [repo: string]: string[];
}
interface UserNodes {
  login: string;
}

export const getRepoFromOwnerName = (owner: string, name: string) =>
  `${owner}/${name}`;

class RepoUsersModule implements Module<IRepoUsers, AppState> {
  public actions: ActionTree<IRepoUsers, AppState> = {
    [FETCH_REPO_USERS]: ({ commit, rootState }, repoName) => {
      const repoNameString = repoName || rootState.repoDetails.name;
      if (!repoNameString) {
        return;
      }
      const [owner, name] = repoNameString.split('/');
      if (owner && name) {
        gitHubGraphQLClient
          .execute({
            query: gql`
            query {
              repository(owner: "${owner}", name: "${name}") {
                assignableUsers(first: 100) {
                  nodes {
                    login
                  }
                }
              }
            }
          `,
          })
          .subscribe(response => {
            commit('addUsers', {
              repo: getRepoFromOwnerName(owner, name),
              collaborators:
                response.data && response.data.repository
                  ? response.data.repository.assignableUsers.nodes.map(
                      (nodes: UserNodes) => nodes.login,
                    )
                  : [],
            });
          });
      }
    },
  };
  public mutations = {
    addUsers: (
      state: IRepoUsers = {},
      {
        repo,
        collaborators,
      }: { repo: string; username: string; collaborators: IRepoUsers },
    ) => {
      Vue.set(state, repo, collaborators);
    },
  };
  public getters = {
    getRepoUsers: (state: IRepoUsers) => (repo: string) => state[repo],
  };
}
const repoUser = new RepoUsersModule();
export default repoUser;
