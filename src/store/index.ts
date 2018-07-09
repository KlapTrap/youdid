import Vue from 'vue';
import Vuex from 'vuex';
import { pullRequest, IPullRequests } from '@/store/modules/pull-requests';

Vue.use(Vuex);

export interface AppState {
  pullRequest: IPullRequests;
}

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    pullRequest,
  },
  strict: debug,
});
