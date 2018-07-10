<template>
  <div class="home">
    <PullRequests></PullRequests>
    <FetchGithubData v-on:repo="setRepo"></FetchGithubData>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PullRequests from '@/components/PullRequests.vue';
import FetchGithubData from '@/components/FetchData.vue';
import { SET_REPO_NAME } from '@/store/modules/repo-info';

@Component({
  components: {
    PullRequests,
    FetchGithubData,
  },
})
export default class Home extends Vue {
  private setRepo(repo: string) {
    this.$store.dispatch(SET_REPO_NAME, repo);
  }
}
</script>
