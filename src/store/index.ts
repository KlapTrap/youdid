import Vue from 'vue';
import Vuex from 'vuex';
import { pullRequest, IPullRequests } from '@/store/modules/pull-requests';
import { IRepoDetails, repoDetails } from '@/store/modules/repo-info';

Vue.use(Vuex);

export interface AppState {
  pullRequest: IPullRequests;
  repoDetails: IRepoDetails;
}

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store<AppState>({
  modules: {
    pullRequest,
    repoDetails,
  },
  strict: debug,
});
