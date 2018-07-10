<template>
  <div>
    <el-input placeholder="Repo name"  v-model="repoString"></el-input>
    <el-button @click="fetchPullRequests()">Fetch Pull Requests</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { FETCH_PULL_REQUESTS } from '../store/modules/pull-requests';
import { setTimeout } from 'timers';
import { SET_REPO_NAME } from '@/store/modules/repo-info';
@Component
export default class FetchGithubData extends Vue {
  public repo = 'cloudfoundry-incubator/stratos';
  private fetchRepo(repo: string) {
    this.$store.dispatch(SET_REPO_NAME, repo);
    this.$store.dispatch(FETCH_PULL_REQUESTS, { repo });
  }
  constructor() {
    super();
    this.fetchRepo(this.repo);
  }
  get repoString() {
    return this.repo;
  }
  set repoString(repo: string) {
    this.repo = repo;
    this.fetchRepo(this.repo);
  }
}
</script>
