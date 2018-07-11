<template>
  <el-date-picker
    v-model="date"
    type="date"
    placeholder="Pick a day"
    :picker-options="pickerOptions"
    :default-value="yesterday">
  </el-date-picker>
</template>

<script lang="ts">
import Vue from 'vue';
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker';
import * as moment from 'moment';
import { Component, Prop, Watch } from 'vue-property-decorator';

export const dateChange = 'date-change';

@Component
export default class DatePicker extends Vue {
  private yesterday = moment()
    .subtract(1, 'days')
    .toDate();

  private twoWeekesAgo = moment()
    .subtract(14, 'days')
    .toDate();

  private date: Date = this.yesterday;

  public mounted() {
    this.$emit(dateChange, this.date);
  }

  @Watch('date')
  private onDateChange(date: Date) {
    this.$emit(dateChange, date);
  }

  private pickerOptions: DatePickerOptions = {
    disabledDate(time: Date) {
      return time.getTime() > Date.now();
    },
    shortcuts: [
      {
        text: 'Yesterday',
        onClick: (picker: ElDatePicker) => {
          picker.$emit('pick', this.yesterday);
        }
      },
      {
        text: '2 weeks ago',
        onClick: (picker: ElDatePicker) => {
          picker.$emit('pick', this.twoWeekesAgo);
        }
      }
    ]
  };
}
</script>

