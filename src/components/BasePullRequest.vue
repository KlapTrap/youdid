<template>
    <el-card v-once class="grid-content" :body-style="{ padding: '0px' }">
      <div class="pr-header">
        <div class="pr-header__state">
          <octicon :class="iconColor" name="git-pull-request" scale="2" class="pr-state-icon"></octicon>
        </div>
        <div class="pr-header__title">
          <a  :href="url">{{ pullRequest.node.title }}</a>
        </div>
      </div>
      <div>
         <el-row :gutter="20">
          <el-col :span="12"><div>Last Update:</div></el-col>
          <el-col :span="12"><div>{{ updatedAt }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"><div>Last commenter:</div></el-col>
          <el-col :span="12"><div>{{ lastCommentor }}</div></el-col>
        </el-row>
      </div>
    </el-card>
</template>

<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 200px;
  margin-bottom: 10px;
}
.pr-header {
  align-items: center;
  display: flex;
  padding: 0 15px;
  &__title {
    flex: 1;
    font-size: 18px;
    font-weight: bold;
    margin: 18px 0;
  }
  &__state {
    flex: none;
    margin-right: 5px;
  }
}
.pr-state-icon {
  &.open {
    color: #28a745;
  }
  &.closed {
    color: #cb2431;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IPullRequest } from '@/store/modules/pull-requests';
import Octicon from 'vue-octicon/components/Octicon.vue';

@Component({
  components: {
    Octicon,
  },
})
export default class BasePullRequest extends Vue {
  public states = {
    MERGED: 'MERGED',
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
  };
  @Prop() public pullRequest!: IPullRequest;

  get updatedAt() {
    return this.pullRequest.node.updatedAt;
  }
  get lastCommentor() {
    const comment = this.pullRequest.node.comments.nodes[0];
    return comment ? comment.author.login : 'None';
  }
  get url() {
    return this.pullRequest.node.url;
  }
  get iconColor() {
    return {
      open: this.pullRequest.node.state === this.states.OPEN,
      closed: this.pullRequest.node.state === this.states.MERGED,
    };
  }
}
</script>

