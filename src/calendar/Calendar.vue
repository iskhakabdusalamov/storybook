<script setup lang="ts">
import { ref, computed } from 'vue'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const monthsShort = [
  'Янв',
  'Февр',
  'Март',
  'Апр',
  'Май',
  'Июнь',
  'Июль',
  'Авг',
  'Сент',
  'Окт',
  'Нояб',
  'Дек',
]

const today = new Date()
const selectedMonth = ref(today.getMonth())
const selectedYear = ref(today.getFullYear())
const selectedDate = ref(today.getDate())

const currentMonthName = computed(() => monthsShort[selectedMonth.value])
const currentYear = computed(() => selectedYear.value)

const dayInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate()
})

const firstDayIndex = computed(() => {
  const firstDay = new Date(selectedYear.value, selectedMonth.value, 1).getDay()
  return firstDay === 0 ? 6 : firstDay - 1
})

const calendarDays = computed(() => {
  const daysArray = []

  for (let i = 0; i < firstDayIndex.value; i++) {
    daysArray.push(null)
  }

  for (let day = 1; day <= dayInMonth.value; day++) {
    daysArray.push(day)
  }

  return daysArray
})

const selectDate = (day: number) => {
  selectedDate.value = day
}

const prevMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value -= 1
  } else {
    selectedMonth.value -= 1
  }
  selectedDate.value = 0
}

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value += 1
  } else {
    selectedMonth.value += 1
  }
  selectedDate.value = 0
}
</script>

<template>
  <div class="calendar">
    <div class="calendar__nav">
      <button
        class="calendar__arrow calendar__arrow--left"
        @click="prevMonth"
      >
        <img
          src="/arrow-left.svg"
          alt=""
        />
      </button>

      <div class="calendar__select">
        <button class="calendar__month">
          <p class="calendar__month-text">{{ currentMonthName }}</p>
          <img
            class="calendar__month-icon"
            src="/arrow-bottom.svg"
            alt=""
          />
        </button>

        <button class="calendar__year">
          <p class="calendar__year-text">{{ currentYear }}</p>
          <img
            class="calendar__year-icon"
            src="/arrow-bottom.svg"
            alt=""
          />
        </button>
      </div>

      <button
        class="calendar__arrow calendar__arrow--right"
        @click="nextMonth"
      >
        <img
          src="/arrow-right.svg"
          alt=""
        />
      </button>
    </div>

    <div class="calendar__grid">
      <div
        v-for="weekDay in weekDays"
        :key="weekDay"
        class="calendar__week"
      >
        <span class="calendar__week-day">
          {{ weekDay }}
        </span>
      </div>

      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar__days"
      >
        <button
          v-if="day"
          class="calendar__day"
          :class="{ 'calendar__date--active': selectedDate === day }"
          @click="selectDate(day)"
        >
          {{ day }}
        </button>

        <div
          v-else
          class="calendar__day"
        />
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
  @include fluid-border-radius(16px, 16px);
  border: 1px solid #d9d9d9;
  height: auto;

  &__nav {
    @include fluid-horizontal(16px, 16px);
    justify-content: center;
    align-items: center;
  }

  &__arrow {
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

  &__select {
    @include fluid-horizontal(8px, 8px);
    @include fluid-width(182px, 182px);
    justify-content: center;
    align-items: center;
  }

  &__month,
  &__year {
    @include fluid-horizontal;
    @include fluid-padding(6px, 6px);
    @include fluid-border-radius(8px, 8px);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: 1px solid #d9d9d9;

    &-text {
      @include fluid-width(51px, 51px);
      @include fluid-height(16px, 16px);
      text-align: start;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    place-items: center;
  }

  &__week-day {
    @include fluid-width(40px, 40px);
    @include fluid-height(20px, 20px);
    @include fluid-font-size(12px, 12px);
    color: #757575;
    font-weight: 400;
    line-height: 1.6;
    font-family: 'Geist', sans-serif;
  }

  &__day {
    @include fluid-width(40px, 40px);
    @include fluid-height(40px, 40px);
    @include fluid-font-size(16px, 16px);
    @include fluid-border-radius(8px, 8px);
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #1e1e1e;
    font-weight: 400;
    line-height: 1.6;

    &:not(.calendar__day--active):hover {
      background-color: #f5f5f5;
    }

    &--active {
      background-color: #2c2c2c;
      color: #f5f5f5;
    }
  }
}
</style>
