import { Module, ActionTree } from 'vuex';
import Vue from 'vue';
import { AppState } from '@/store';

export const SET_REPO_NAME = 'repo/setName';

export interface IRepoDetails {
  name: string;
}

class RepoDetailsModule implements Module<IRepoDetails, AppState> {
  public actions: ActionTree<IRepoDetails, AppState> = {
    [SET_REPO_NAME]: ({ commit }, name) => commit('setRepoName', name),
  };
  public mutations = {
    setRepoName(state: IRepoDetails, repoName: string) {
      Vue.set(state, 'name', repoName);
    },
  };
  public getters = {
    getRepoName: (state: IRepoDetails) => state.name,
  };
}

export const repoDetails = new RepoDetailsModule();
