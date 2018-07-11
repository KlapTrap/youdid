<template>
  <el-card class="commit" shadow="never">
    <a slot="header" :href="commit.html_url" class="commit-header">{{commit.commit.message}}</a>
    <CardBody :rows="cardBodyRows" ></CardBody>
  </el-card>
</template>

<style lang="scss" scoped>
.commit {
}

.commit-header {
  display: block;
  max-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #42b983;
  text-decoration: none;
  &:visited {
    color: #42b983;
  }
}
</style>


<script lang="ts">
import Vue from 'vue';
import { getISO, getRepoKey } from '@/modules/helpers';
import { Component, Prop } from 'vue-property-decorator';
import { IRootCommit } from '@/store/modules/commits';
import CardBody, { ICardBodyRow } from '@/components/CardBody.vue';
import * as moment from 'moment';
@Component({
  components: {
    CardBody
  }
})
export default class Commit extends Vue {
  @Prop() private commit!: IRootCommit;

  get cardBodyRows(): ICardBodyRow[] {
    const rows = [
      {
        title: 'Committer',
        value: this.commit.commit.committer.name
      },
      {
        title: 'Committed',
        value: moment(this.commit.commit.author.date).fromNow()
      }
    ];
    return rows;
  }
}
</script>
