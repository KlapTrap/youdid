<template>
  <div class="home">
    <el-header>
      <div class="header-inner">
        <h2>Recently Updated PRs</h2>
        <h2>Recently Created PRs</h2>
        <h2>Recently Created PRs</h2>
      </div>
    </el-header>
    <div class="header-inner">
      <PullRequests class="pull-request"></PullRequests>
      <PullRequests class="pull-request"></PullRequests>
      <PullRequests class="pull-request"></PullRequests>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-inner {
  display: flex;
  h2 {
    flex: 1;
  }
  .pull-request {
    margin: 0 10px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PullRequests from '@/components/PullRequests.vue';
import { SET_REPO_NAME } from '@/store/modules/repo-info';

@Component({
  components: {
    PullRequests,
  },
})
export default class Home extends Vue {}
</script>
