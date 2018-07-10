<template>
    <el-card shadow="never" v-once class="grid-content" :body-style="{ padding: '0px' }">
      <div class="pr-header">
        <div class="pr-header__state">
          <octicon :class="iconColor" name="git-pull-request" scale="2" class="pr-state-icon"></octicon>
        </div>
        <div class="pr-header__title">
          <a :href="url">{{ pullRequest.node.title }}</a>
        </div>
      </div>
      <div>
        <CardBody :rows="cardBodyRows"></CardBody>
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
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IPullRequest } from '@/store/modules/pull-requests';
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
  @Prop() public pullRequest!: IPullRequest;

  get cardBodyRows(): ICardBodyRow[] {
    const comment = this.pullRequest.node.comments.nodes[0];
    const commentAuthor = comment ? comment.author.login : 'None';
    console.log(this.pullRequest);
    return [
      {
        title: 'Last Update',
        value: moment(this.pullRequest.node.updatedAt).fromNow(),
      },
      {
        title: 'Last commenter',
        value: commentAuthor,
      },
    ];
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

