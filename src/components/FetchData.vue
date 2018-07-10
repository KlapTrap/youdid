<template>
  <div class="repo-inputs">
    <el-input  v-model="repoString">
      <template slot="prepend">github.com/</template>
    </el-input>
    <el-select v-model="usernameString" filterable placeholder="Users">
      <el-option
        v-for="user in repoUsers"
        :key="user"
        :label="user"
        :value="user">
      </el-option>
    </el-select>
    <!-- <el-input v-model="usernameString">
      <template slot="prepend">Github Username</template>
    </el-input> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { FETCH_PULL_REQUESTS } from '../store/modules/pull-requests';
import { setTimeout } from 'timers';
import { SET_REPO_NAME, SET_USERNAME } from '@/store/modules/repo-info';
import { FETCH_REPO_USERS } from '@/store/modules/repo-users';
@Component
export default class FetchGithubData extends Vue {
  public repo = 'cloudfoundry-incubator/stratos';
  public username = 'klaptrap';

  public mounted() {
    this.fetchRepo();
    this.$store.dispatch(FETCH_REPO_USERS);
  }

  private fetchRepo() {
    if (this.username) {
      this.$store.dispatch(SET_REPO_NAME, this.repo);
    }
    if (this.username) {
      this.$store.dispatch(SET_USERNAME, this.username);
    }
    if (this.repo && this.username) {
      this.$store.dispatch(FETCH_PULL_REQUESTS, {
        repo: this.repo,
        username: this.username,
      });
    }
  }
  get repoUsers() {
    return this.$store.getters.getRepoUsers(this.repo);
  }

  get repoString() {
    return this.repo;
  }

  set repoString(repo: string) {
    this.repo = repo;
    this.fetchRepo();
    this.$store.dispatch(FETCH_REPO_USERS);
  }

  get usernameString() {
    return this.username;
  }
  set usernameString(username: string) {
    this.username = username;
    this.fetchRepo();
  }
}
</script>

<style lang="scss" scoped>
.repo-inputs {
  display: flex;
}
.el-input,
.el-select {
  margin: 0 20px;
}
</style>


