<template>
  <div>
    <div>{{ repo }}</div>
    <div>{{ pullRequests }}</div>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IPullRequest } from '@/store/modules/pull-requests';

@Component
export default class PullRequests extends Vue {
  get repo() {
    return this.$store.state.repoDetails.name;
  }
  get pullRequests() {
    return this.$store.state.pullRequest[this.repo];
  }
}
</script>

