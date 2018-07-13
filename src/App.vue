<template>
  <div id="app">
    <h1>you<span class="did">did</span></h1>
    <FetchGithubData></FetchGithubData>
    <div class="nav">
      <router-link class="nav-item" to="/prs">PRs</router-link>
      <router-link class="nav-item" to="/commits">Commits</router-link>
    </div>
    <el-container>
      <router-view/>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FetchGithubData from '@/components/FetchData.vue';
import {
  SET_REPO_NAME,
  SET_USERNAME,
  SET_DATE,
  SET_BRANCH,
} from '@/store/modules/repo-info';
import * as moment from 'moment';
@Component({
  components: {
    FetchGithubData,
  },
})
export default class App extends Vue {
  private created() {
    this.commitRepoDetails();
  }
  private commitRepoDetails() {
    const { repo, username, date, branch } = this.$route.query;
    if (repo) {
      this.$store.dispatch(SET_REPO_NAME, repo);
    }
    if (username) {
      this.$store.dispatch(SET_USERNAME, username);
    }
    if (date) {
      this.$store.dispatch(SET_DATE, moment(date).toDate());
    }
    if (branch) {
      this.$store.dispatch(SET_BRANCH, branch);
    }
  }

  @Watch('watchableRepoD33ts')
  private setUrlParam() {
    const data = {
      ...this.$route.query,
      ...{
        repo: this.repo,
        username: this.username,
        date: this.date,
        branch: this.branch,
      },
    };
    this.$router.push({ name: this.$router.currentRoute.name, query: data });
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
    return this.$store.state.repoDetails.date;
  }
  get branch() {
    return this.$store.getters.getBranch;
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.did {
  color: #42b983;
}
.nav {
  padding: 20px;
  .nav-item + .nav-item {
    margin-left: -1px;
  }
  .nav-item {
    position: relative;
    z-index: 1;
    border: 1px solid #e1e4e8;
    padding: 10px 10px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

    &.router-link-active {
      z-index: 2;
      background-color: #42b983;
      border-color: #42b983;
      color: white;
    }
  }
}
</style>
