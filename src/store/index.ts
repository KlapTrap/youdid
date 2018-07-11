import commits, { ICommits } from '@/store/modules/commits';
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
  commits: ICommits;
}

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store<AppState>({
  modules: {
    pullRequest,
    repoDetails,
    repoUser,
    commits
  },
  strict: debug
});
