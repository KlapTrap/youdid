<template>
  <div>
    <el-row v-for="pullRequest in pullRequests" :key="pullRequest.number">
      <el-col>
        <BasePullRequest :pullRequest="pullRequest"></BasePullRequest>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 200px;
  margin-bottom: 10px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IPullRequest } from '@/store/modules/pull-requests';
import BasePullRequest from '@/components/BasePullRequest.vue';
import Octicon from 'vue-octicon/components/Octicon.vue';

@Component({
  components: {
    Octicon,
    BasePullRequest,
  },
})
export default class BasePullRequests extends Vue {
  @Prop() public pullRequests!: IPullRequest[];
}
</script>

