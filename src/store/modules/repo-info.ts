import { Module, ActionTree } from 'vuex';
import Vue from 'vue';
import { AppState } from '@/store';

export const SET_REPO_NAME = 'repo/setName';
export const SET_USERNAME = 'repo/setUsername';
export const SET_DATE = 'repo/setDate';

export interface IRepoDetails {
  name: string;
  username: string;
  date: Date;
}

class RepoDetailsModule implements Module<IRepoDetails, AppState> {
  public actions: ActionTree<IRepoDetails, AppState> = {
    [SET_REPO_NAME]: ({ commit }, name: string) => commit('setRepoName', name),
    [SET_USERNAME]: ({ commit }, username: string) =>
      commit('setUsername', username),
    [SET_DATE]: ({ commit }, date: string) => commit('setDate', date)
  };
  public mutations = {
    setRepoName(state: IRepoDetails, repoName: string) {
      Vue.set(state, 'name', repoName);
    },
    setUsername(state: IRepoDetails, userName: string) {
      Vue.set(state, 'username', userName);
    },
    setDate(state: IRepoDetails, date: string) {
      Vue.set(state, 'date', date);
    }
  };
  public getters = {
    getRepoName: (state: IRepoDetails) => state.name,
    getDate: (state: IRepoDetails) => new Date(state.date)
  };
}

export const repoDetails = new RepoDetailsModule();
