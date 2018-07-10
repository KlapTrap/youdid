<template>
  <div class="card-body">
    <div v-for="(row, index) in rows" :key="index" class="card-body-row">
      <div class="card-body-row__title">{{ row.title }}</div>
      <div class="card-body-row__value"><b>{{ row.value }}</b></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-body {
  margin-bottom: 20px;
}
.card-body-row {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  &__title,
  &__value {
    flex: none;
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
import { Prop, Component } from 'vue-property-decorator';
@Component
export default class CardBody extends Vue {
  @Prop({ default: [] })
  private rows!: ICardBodyRow[];
}
</script>

