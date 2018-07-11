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
import { Component, Vue } from 'vue-property-decorator';
import PullRequests from '@/components/PullRequests.vue';
import CreatedPullRequests from '@/components/CreatedPullRequests.vue';
import { SET_REPO_NAME } from '@/store/modules/repo-info';

@Component({
  components: {
    PullRequests,
    CreatedPullRequests
  }
})
export default class Home extends Vue {}
</script>
