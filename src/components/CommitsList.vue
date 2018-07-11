<template>
  <div>
    {{commits}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getISO, getRepoKey } from '@/modules/helpers';
import { Component } from 'vue-property-decorator';
@Component
export default class CommitsList extends Vue {
  get repo() {
    return this.$store.state.repoDetails.name;
  }
  get username() {
    return this.$store.state.repoDetails.username;
  }

  get date() {
    return getISO(this.$store.getters.getDate);
  }
  get commits() {
    return this.$store.getters.getCommits(this.repo, this.username, this.date);
  }
}
</script>

