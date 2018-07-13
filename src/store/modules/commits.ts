import { getISO, getRepoKey } from '@/modules/helpers';
import { gitHubApiClient } from './../../modules/github-api';
import { Module, ActionTree } from '../../../node_modules/vuex';
import { AppState } from '@/store';
import Vue from 'vue';

export const FETCH_COMMITS = 'commits/fetch';

export interface IRootCommit {
  sha: string;
  node_id: string;
  commit: ICommit;
  url: string;
  html_url: string;
  comments_url: string;
  author: ICommitAuthor;
  committer: ICommitAuthor;
  parents: IParent[];
}

export interface IParent {
  sha: string;
  url: string;
  html_url: string;
}

export interface ICommitAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ICommit {
  author: IAuthor;
  committer: IAuthor;
  message: string;
  tree: ITree;
  url: string;
  comment_count: number;
  verification: IVerification;
}

export interface IVerification {
  verified: boolean;
  reason: string;
  signature: string;
  payload: string;
}

export interface ITree {
  sha: string;
  url: string;
}

export interface IAuthor {
  name: string;
  email: string;
  date: string;
}

export interface ICommits {
  [key: string]: IRootCommit[];
}

class CommitModule implements Module<ICommits, AppState> {
  public actions: ActionTree<ICommits, AppState> = {
    [FETCH_COMMITS]: (
      { commit },
      {
        repo = '',
        username = '',
        date,
        branch = '',
      }: { repo: string; username: string; date: Date; branch: string },
    ) => {
      const dateString = getISO(date);
      gitHubApiClient
        .fetch(
          `repos/${repo}/commits?author=${username}&since=${dateString}${
            branch ? '&sha=' + branch : ''
          }`,
        )
        .subscribe(commits =>
          commit('addCommits', {
            commits,
            dateString,
            username,
            repo,
            branch,
          }),
        );
    },
  };
  public mutations = {
    addCommits: (
      state: ICommits = {},
      {
        repo,
        username,
        dateString,
        commits,
        branch,
      }: {
        repo: string;
        username: string;
        dateString: string;
        commits: IRootCommit[];
        branch: string;
      },
    ) => {
      Vue.set(state, getRepoKey(repo + branch, username, dateString), commits);
    },
  };

  public getters = {
    getCommits: (state: ICommits) => (
      repo: string,
      username: string,
      date: string,
      branch: string = '',
    ) => {
      return state[getRepoKey(repo + branch, username, date)];
    },
  };
}
const commitsModule = new CommitModule();
export default commitsModule;
