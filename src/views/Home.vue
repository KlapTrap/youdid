<template>
  <div class="home">
    <img src="../assets/logo.png">
    <PullRequests></PullRequests>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PullRequests from '@/components/PullRequests.vue';

@Component({
  components: {
    PullRequests
  }
})
export default class Home extends Vue {}
</script>
