<template>
  <div id="app">
    <h1>you<span class="did">did</span></h1>
    <FetchGithubData></FetchGithubData>
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
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
