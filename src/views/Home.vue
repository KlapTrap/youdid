<template>
  <div class="home">
    <FetchGithubData v-on:repo="setRepo"></FetchGithubData>
    <el-row :gutter="20">
      <el-col :s="8" :lg="6">
        <h2>Recently Updated PRs</h2>
        <PullRequests></PullRequests>
        </el-col>
      <el-col :s="8" :lg="6">
        <h2>Recently Created PRs</h2>
        <PullRequests></PullRequests>
        </el-col>
      <el-col :s="8" :lg="6">
        <h2>Recently Created PRs</h2>
        <PullRequests></PullRequests>
        </el-col>
      <el-col :s="8" :lg="6">
        <h2>Recently Created PRs</h2>
        <PullRequests></PullRequests>
        </el-col>
    </el-row>

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
