<template>
  <div class="home">
    <el-header>
      <div class="pr-column">
        <h2>Created PRs</h2>
        <h2>Updated PRs</h2>
      </div>
    </el-header>
    <div class="pr-column">
      <CreatedPullRequests class="pull-request"></CreatedPullRequests>
      <PullRequests class="pull-request"></PullRequests>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pr-column {
  display: flex;
  h2 {
    flex: 1;
  }
  .pull-request {
    flex: 1;
    margin: 0 10px;
  }
}
.home {
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import PullRequests from '@/components/PullRequests.vue';
import CreatedPullRequests from '@/components/CreatedPullRequests.vue';
import { FETCH_PULL_REQUESTS } from '@/store/modules/pull-requests';
import { SET_REPO_NAME } from '@/store/modules/repo-info';

@Component({
  components: {
    PullRequests,
    CreatedPullRequests,
  },
})
export default class Home extends Vue {
  @Watch('watchableRepoD33ts')
  private fetchRepo() {
    if (this.repo && this.username && this.date) {
      this.$store.dispatch(FETCH_PULL_REQUESTS, {
        repo: this.repo,
        username: this.username,
        date: this.date,
      });
    }
  }

  get watchableRepoD33ts() {
    return this.repo, this.username, this.date, Date.now();
  }

  get repo() {
    return this.$store.getters.getRepoName;
  }
  get username() {
    return this.$store.getters.getUsername;
  }
  get date() {
    return this.$store.getters.getDate;
  }
}
</script>
