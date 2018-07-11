<template>
    <el-card shadow="never" class="grid-content" :body-style="{ padding: '0px' }">
      <div class="pr-header">
        <div class="pr-header__state">
          <octicon v-if="isMerged" name="git-merge" scale="2" class="pr-state-icon merged"></octicon>
          <octicon v-else :class="iconColor" name="git-pull-request" scale="2" class="pr-state-icon"></octicon>
        </div>
        <div class="pr-header__title">
          <a :href="url">{{ pullRequest.node.title }}</a>
        </div>
      </div>
      <div class="pr-body">
        <CardBody :rows="cardBodyRows"></CardBody>
        <div class="pr-tags">
          <el-tag class="pr-tag" :style="{ color: getCorrectTextColor(label.color) }" v-for="label in pullRequest.node.labels.nodes" :key="label.name" :color="getColor(label.color)">{{label.name}}</el-tag>
        </div>
      </div>
    </el-card>
</template>

<style lang="scss" scoped>
.pr-body {
  padding: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 200px;
  margin-bottom: 10px;
}
.pr-tags {
  width: 100%;
  text-align: start;
}
.pr-tag {
  font-weight: bolder;
  margin: 0px 5px 5px;
}
.pr-header {
  align-items: center;
  display: flex;
  min-height: 80px;
  padding: 0 15px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
  &__title {
    a {
      color: #42b983;
      text-decoration: none;
      &:visited {
        color: #42b983;
      }
    }
    flex: 1;
    font-size: 18px;
    font-weight: bold;
    margin: 18px 0;
  }
  &__state {
    flex: none;
    margin: 10px;
  }
}
.pr-state-icon {
  &.open {
    color: #28a745;
  }
  &.closed {
    color: #cb2431;
  }
  &.merged {
    color: #6f42c1;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IPullRequest } from '@/store/modules/pull-requests';
import { getCorrectTextColor } from '@/modules/helpers';
import CardBody, { ICardBodyRow } from '@/components/CardBody.vue';
import Octicon from 'vue-octicon/components/Octicon.vue';
import * as moment from 'moment';

@Component({
  components: {
    Octicon,
    CardBody,
  },
})
export default class BasePullRequest extends Vue {
  public states = {
    MERGED: 'MERGED',
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
  };
  @Prop() private pullRequest!: IPullRequest;

  private getCorrectTextColor = getCorrectTextColor;

  private getColor = (color: string) => `#${color}`;

  get cardBodyRows(): ICardBodyRow[] {
    const comment = this.pullRequest.node.comments.nodes[0];
    const commentAuthor = comment ? comment.author.login : 'None';
    const rows = [
      {
        title: 'Last Update',
        value: moment(this.pullRequest.node.updatedAt).fromNow(),
      },
      {
        title: 'Last commenter',
        value: commentAuthor,
      },
    ];
    return rows;
  }

  get url() {
    return this.pullRequest.node.url;
  }

  get isMerged() {
    return this.pullRequest.node.state === this.states.MERGED;
  }

  get iconColor() {
    return {
      open: this.pullRequest.node.state === this.states.OPEN,
      closed: this.pullRequest.node.state === this.states.CLOSED,
    };
  }
}
</script>

