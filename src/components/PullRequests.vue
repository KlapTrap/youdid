<template>
  <div>
    <div>{{ pullRequests }}</div>
    <el-button @click="fetchPullRequests()">Fetch Pull Requests</el-button>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import { AppState } from '../store';
import { FETCH_PULL_REQUESTS } from '../store/modules/pull-requests';
import gql from 'graphql-tag';
import { mapGetters, mapState } from 'vuex';

@Component
export default class PullRequests extends Vue {
  get pullRequests() {
    return this.$store.state.pullRequests;
  }

  public fetchPullRequests() {
    return this.$store.dispatch(FETCH_PULL_REQUESTS, { repo: 'vuejs/vuex' });
  }
}
</script>

