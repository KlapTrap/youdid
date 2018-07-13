<template>
  <div class="commit-list">
    <div class="branch-selector">
      <el-input v-model="internalBranch" placeholder="Default branch">
        <template slot="prepend">Branch</template>
      </el-input>
      <el-button class="branch-selector__button" v-on:click="setBranch()" type="primary">Set Branch Name</el-button>
    </div>
    <h1>Commits</h1>
    <CommitsList></CommitsList>
  </div>
</template>

<style lang="scss" scoped>
.commit-list {
  width: 100%;
  margin: 0;
  @media only screen and (min-width: 800px) {
    & {
      margin: auto;
      width: 70%;
    }
  }
}
.branch-selector {
  display: flex;
  @media only screen and (max-width: 800px) {
    & {
      flex-direction: column;
    }
  }
  &__button {
    margin-left: 20px;
    @media only screen and (max-width: 800px) {
      & {
        margin: 10px 0;
      }
    }
  }
}
</style>


<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import CommitsList from '@/components/CommitsList.vue';
import { FETCH_COMMITS } from '@/store/modules/commits';
import { SET_BRANCH } from '@/store/modules/repo-info';

@Component({
  components: {
    CommitsList,
  },
})
export default class Commits extends Vue {
  public internalBranch = 'hello';

  private mounted() {
    this.internalBranch = this.$store.getters.getBranch || '';
    this.fetchCommits();
  }

  private setBranch() {
    this.$store.dispatch(SET_BRANCH, this.internalBranch);
  }

  @Watch('watchableRepoD33ts')
  private fetchCommits() {
    if (this.repo && this.username && this.date) {
      this.$store.dispatch(FETCH_COMMITS, {
        repo: this.repo,
        username: this.username,
        date: this.date,
        branch: this.branch,
      });
    }
  }

  get watchableRepoD33ts() {
    return [this.repo, this.username, this.date, this.branch].join();
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
  get branch() {
    return this.$store.getters.getBranch;
  }
}
</script>
