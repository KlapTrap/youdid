<template>
  <div class="repo-inputs">
    <el-input class="repo-select" v-model="repoString">
      <template slot="prepend">github.com/</template>
    </el-input>
    <el-select class="user-select" v-model="usernameString" filterable placeholder="Users">
      <el-option
        v-for="user in repoUsers"
        :key="user"
        :label="user"
        :value="user">
      </el-option>
    </el-select>
    <DatePicker class="date-select" v-on:date-change="changeDate"></DatePicker>
    <el-button class="submit-button" v-on:click="commitRepoDetails()" type="primary">Set Repo Details</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { FETCH_PULL_REQUESTS } from '../store/modules/pull-requests';
import { setTimeout } from 'timers';
import {
  SET_REPO_NAME,
  SET_USERNAME,
  SET_DATE,
} from '@/store/modules/repo-info';
import { FETCH_REPO_USERS } from '@/store/modules/repo-users';
import DatePicker from '@/components/DatePicker.vue';
import { FETCH_COMMITS } from '@/store/modules/commits';
import * as moment from 'moment';

@Component({
  components: {
    DatePicker,
  },
})
export default class FetchGithubData extends Vue {
  public repo: string = this.$store.getters.getRepoName || '';
  public username: string = this.$store.getters.getUsername || '';
  public date!: Date;
  public timeout!: number;

  public mounted() {
    // this.commitRepoDetails();
    this.fetchRepoUsers(null, true);
  }

  public fetchRepoUsers(repoName: string | null, retainUser?: boolean) {
    const main = this;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      main.$store.dispatch(FETCH_REPO_USERS, repoName);
      if (retainUser !== true) {
        main.username = '';
      }
    }, 250);
  }

  private commitRepoDetails() {
    if (this.repo) {
      this.$store.dispatch(SET_REPO_NAME, this.repo);
    }
    if (this.username) {
      this.$store.dispatch(SET_USERNAME, this.username);
    }
    if (this.date) {
      this.$store.dispatch(SET_DATE, this.date);
    }
  }

  private changeDate(date: Date) {
    this.date = date;
  }

  get repoUsers() {
    return this.$store.getters.getRepoUsers(this.repoString);
  }

  get repoString() {
    return this.repo;
  }

  set repoString(repo: string) {
    this.repo = repo;
    this.fetchRepoUsers(repo);
  }

  get usernameString() {
    return this.username;
  }
  set usernameString(username: string) {
    this.username = username;
  }
}
</script>

<style lang="scss" scoped>
.repo-select {
  flex: 2;
}
.user-select,
.date-select {
  flex: 1;
}
.repo-inputs {
  display: flex;
  @media only screen and (max-width: 800px) {
    & {
      flex-direction: column;
    }
  }
}
.user-select,
.date-select,
.repo-select,
.submit-button {
  @media only screen and (min-width: 800px) {
    & {
      margin: 0 10px;
      width: auto;
    }
  }
  width: 100%;
  margin: 10px 0px;
}
</style>


