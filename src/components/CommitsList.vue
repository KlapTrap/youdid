<template>
  <div class="commit-list">
    <Commit class="commit" v-for="(commit, index) in commits" :key="index" :commit="commit"></Commit>
  </div>
</template>

<style lang="scss" scoped>
.commit {
  margin-bottom: 20px;
}
</style>


<script lang="ts">
import Vue from 'vue';
import { getISO, getRepoKey } from '@/modules/helpers';
import Commit from '@/components/Commit.vue';
import { Component } from 'vue-property-decorator';
@Component({
  components: {
    Commit,
  },
})
export default class CommitsList extends Vue {
  get repo() {
    return this.$store.state.repoDetails.name;
  }
  get username() {
    return this.$store.state.repoDetails.username;
  }

  get branch() {
    return this.$store.state.repoDetails.branch;
  }

  get date() {
    return getISO(this.$store.getters.getDate);
  }

  get commits() {
    return this.$store.getters.getCommits(
      this.repo,
      this.username,
      this.date,
      this.branch,
    );
  }
}
</script>
