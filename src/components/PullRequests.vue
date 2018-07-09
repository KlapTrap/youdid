<template>
  <div>{{ pullRequests }}</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { gitHubGraphQLClient } from '@/modules/github-graphql';
import gql from 'graphql-tag';
@Component
export default class PullRequests extends Vue {
  public pullRequests = {};
  constructor() {
    super();
    gitHubGraphQLClient
      .execute({
        query: gql`
          query {
            viewer {
              login
            }
          }
        `
      })
      .subscribe(
        data =>
          (this.pullRequests = {
            ...data.data
          })
      );
  }
}
</script>

