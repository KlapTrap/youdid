<template>
  <CommitsList></CommitsList>
</template>

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
