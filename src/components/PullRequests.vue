<template>
  <BasePullRequests :pullRequests="pullRequests"></BasePullRequests>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IPullRequest } from '@/store/modules/pull-requests';
import BasePullRequests from '@/components/BasePullRequests.vue';

@Component({
  components: {
    BasePullRequests,
  },
})
export default class PullRequests extends Vue {
  get repo() {
    return this.$store.state.repoDetails.name;
  }
  get username() {
    return this.$store.state.repoDetails.username;
  }
  get pullRequests() {
    return this.$store.getters.getRepoPullRequests;
  }
}
</script>

