<template>
  <div class="commit-list">
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
import { Component, Vue } from 'vue-property-decorator';
import CommitsList from '@/components/CommitsList.vue';

@Component({
  components: {
    CommitsList
  }
})
export default class Commits extends Vue {}
</script>
