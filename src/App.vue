<template>
  <div id="app">
    <h1>you<span class="did">did</span></h1>
    <FetchGithubData></FetchGithubData>
    <div class="nav">
      <router-link class="nav-item" to="/">PRs</router-link>
      <router-link class="nav-item" to="/commits">Commits</router-link>
    </div>
    <el-container>
      <router-view/>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FetchGithubData from '@/components/FetchData.vue';
@Component({
  components: {
    FetchGithubData,
  },
})
export default class App extends Vue {}
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

    &.router-link-exact-active {
      z-index: 2;
      background-color: #42b983;
      border-color: #42b983;
      color: white;
    }
  }
}
</style>
