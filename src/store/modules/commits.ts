import { getISO, getRepoKey } from '@/modules/helpers';
import { gitHubApiClient } from './../../modules/github-api';
import { Module, ActionTree } from '../../../node_modules/vuex';
import { AppState } from '@/store';
import Vue from 'vue';

export const FETCH_COMMITS = 'commits/fetch';

export interface ICommit {}

export interface ICommits {
  [key: string]: ICommit[];
}

class CommitModule implements Module<ICommits, AppState> {
  public actions: ActionTree<ICommits, AppState> = {
    [FETCH_COMMITS]: (
      { commit, state },
      { repo, username, date }: { repo: string; username: string; date: Date }
    ) => {
      const dateString = getISO(date);
      gitHubApiClient
        .fetch(`repos/${repo}/commits?author=${username}&since=${dateString}`)
        .subscribe(commits =>
          commit('addCommits', {
            commits,
            dateString,
            username,
            repo
          })
        );
    }
  };
  public mutations = {
    addCommits: (
      state: ICommits = {},
      {
        repo,
        username,
        dateString,
        commits
      }: {
        repo: string;
        username: string;
        dateString: string;
        commits: ICommits;
      }
    ) => {
      Vue.set(state, getRepoKey(repo, username, dateString), commits);
    }
  };

  public getters = {
    getCommits: (state: ICommits) => (
      repo: string,
      username: string,
      date: string
    ) => {
      return state[getRepoKey(repo, username, date)];
    }
  };
}
const commitsModule = new CommitModule();
export default commitsModule;
