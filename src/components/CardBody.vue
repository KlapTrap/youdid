<template>
  <div class="card-body">
    <div v-for="(row, index) in rows" :key="index" class="card-body-row">
      <div class="card-body-row__title">{{ row.title }}</div>
      <div class="card-body-row__value">{{ row.value }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-body {
  display: flex;
}
.card-body-row {
  display: flex;
  &__title,
  &__value {
    flex: 1;
  }
  &__title {
    font-weight: lighter;
  }
}
</style>


<script lang="ts">
export interface ICardBodyRow {
  title: string;
  value: string;
}
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
export default class CardBody extends Vue {
  @Prop() public rows: ICardBodyRow[] = [];
}
</script>

