<script setup lang="ts">
import { ref } from 'vue'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()

const dayInMonth = new Date(year, month + 1, 0).getDate()

const currentDay = today.getDate()

const selectedDate = ref<number>(currentDay)

const selectDate = (day: number) => {
  selectedDate.value = day
}
</script>

<template>
  <div class="calendar">
    <div class="block">
      <button class="arrow-left">
        <img
          src="/arrow-left.svg"
          alt=""
        />
      </button>

      <div class="select-group">
        <button class="month-field">
          <span>Sep</span>
          <img
            src="/arrow-bottom.svg"
            alt=""
          />
        </button>

        <button class="year-field">
          <span>2025</span>
          <img
            src="/arrow-bottom.svg"
            alt=""
          />
        </button>
      </div>

      <button class="arrow-right">
        <img
          src="/arrow-right.svg"
          alt=""
        />
      </button>
    </div>

    <div class="table">
      <div
        v-for="weekDay in weekDays"
        :key="weekDay"
        class="week"
      >
        <span class="week-day">
          {{ weekDay }}
        </span>
      </div>

      <div
        v-for="day in dayInMonth"
        :key="day"
        class="dates"
      >
        <button
          class="date"
          :class="{ 'active-date': selectedDate === day }"
          @click="selectDate(day)"
        >
          {{ day }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../.storybook/fluid-mixins.scss' as *;

.calendar {
  @include fluid-vertical(16px, 16px);
  @include fluid-padding(16px, 16px);
  @include fluid-width(318px, 318px);
  @include fluid-height(308px, 308px);
  border: 1px solid #d9d9d9;
  border-radius: 16px;
}

.block {
  @include fluid-horizontal(16px, 16px);
  justify-content: center;
  align-items: center;
}

.select-group {
  @include fluid-horizontal(8px, 8px);
  @include fluid-width(182px, 182px);
  justify-content: center;
  align-items: center;
}

.month-field {
  @include fluid-horizontal;
  @include fluid-padding(6px, 6px);
  @include fluid-border-radius(8px, 8px);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: 1px solid #d9d9d9;

  span {
    @include fluid-width(51px, 51px);
    @include fluid-height(16px, 16px);
    text-align: start;
  }
}

.year-field {
  @include fluid-horizontal;
  @include fluid-padding(6px, 6px);
  @include fluid-border-radius(8px, 8px);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: 1px solid #d9d9d9;

  span {
    @include fluid-width(51px, 51px);
    @include fluid-height(16px, 16px);
    text-align: start;
  }
}

.arrow-left,
.arrow-right {
  @include fluid-width(36px, 36px);
  @include fluid-height(36px, 36px);
  cursor: pointer;
  border: none;
  background-color: transparent;

  &:hover {
    border-radius: 50%;
    background-color: #f5f5f5;
  }
}

.table {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
}

.week-day {
  @include fluid-width(40px, 40px);
  @include fluid-height(20px, 20px);
  @include fluid-font-size(12px, 12px);
  color: #757575;
  font-weight: 400;
  line-height: 1.6;
  font-family: 'Geist', sans-serif;
}

.date {
  @include fluid-width(40px, 40px);
  @include fluid-height(40px, 40px);
  @include fluid-font-size(16px, 16px);
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: #1e1e1e;
  font-weight: 400;
  line-height: 1.6;
}

.date:not(.active-date):hover {
  background-color: #f5f5f5;
}

.active-date {
  background-color: #2c2c2c;
  color: #f5f5f5;
}
</style>
