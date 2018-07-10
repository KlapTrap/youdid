import { Module, ActionTree } from 'vuex';
import Vue from 'vue';
import { AppState } from '@/store';

export const SET_REPO_NAME = 'repo/setName';
export const SET_USERNAME = 'repo/setUsername';

export interface IRepoDetails {
  name: string;
  username: string;
}

class RepoDetailsModule implements Module<IRepoDetails, AppState> {
  public actions: ActionTree<IRepoDetails, AppState> = {
    [SET_REPO_NAME]: ({ commit }, name) => commit('setRepoName', name),
    [SET_USERNAME]: ({ commit }, name) => commit('setUsername', name),
  };
  public mutations = {
    setRepoName(state: IRepoDetails, repoName: string) {
      Vue.set(state, 'name', repoName);
    },
    setUsername(state: IRepoDetails, userName: string) {
      Vue.set(state, 'username', userName);
    },
  };
  public getters = {
    getRepoName: (state: IRepoDetails) => state.name,
  };
}

export const repoDetails = new RepoDetailsModule();
