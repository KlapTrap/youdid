<template>
  <div class="home">
    <div class="pr-column">
      <div class="pull-request">
        <h2>Created PRs</h2>
        <CreatedPullRequests ></CreatedPullRequests>
      </div>
      <div class="pull-request">
        <h2>Updated PRs</h2>
        <PullRequests ></PullRequests>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pr-column {
  display: flex;
  @media only screen and (max-width: 800px) {
    & {
      flex-direction: column;
    }
  }
  h2 {
    flex: 1;
  }
  .pull-request {
    flex: 1;
    margin: 0 10px;
    @media only screen and (max-width: 800px) {
      & {
        margin: 0;
      }
    }
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
  private mounted() {
    this.fetchRepo();
  }
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
    return [this.repo, this.username, this.date].join();
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
