<template>
  <div class="commit-list">
    <el-input v-model="branch" placeholder="Default branch">
      <template slot="prepend">Branch</template>
    </el-input>
    <h1>Commits</h1>
    <CommitsList></CommitsList>
  </div>
</template>

<style lang="scss" scoped>
.commit-list {
  margin: auto;
  width: 70%;
}
</style>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CommitsList from '@/components/CommitsList.vue';
import { FETCH_COMMITS } from '@/store/modules/commits';
import { SET_BRANCH } from '@/store/modules/repo-info';

@Component({
  components: {
    CommitsList,
  },
})
export default class Commits extends Vue {
  private mounted() {
    this.fetchCommits();
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
    return this.repo, this.username, this.date, this.branch, Date.now();
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

  set branch(branch: string) {
    this.$store.dispatch(SET_BRANCH, branch);
  }
}
</script>
