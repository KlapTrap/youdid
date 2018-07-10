import Vue from 'vue';
import Vuex from 'vuex';
import { pullRequest, IPullRequests } from '@/store/modules/pull-requests';
import { IRepoDetails, repoDetails } from '@/store/modules/repo-info';
import repoUser, { IRepoUsers } from '@/store/modules/repo-users';

Vue.use(Vuex);

export interface AppState {
  pullRequest: IPullRequests;
  repoDetails: IRepoDetails;
  repoUser: IRepoUsers;
}

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store<AppState>({
  modules: {
    pullRequest,
    repoDetails,
    repoUser,
  },
  strict: debug,
});
