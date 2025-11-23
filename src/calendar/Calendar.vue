<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref<string | null>(null)

const selectDay = (day: string) => {
  selectedDate.value = day
}

const week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс']
const dates = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
]
</script>

<template>
  <div class="calendar">
    <div
      v-for="weekDay in week"
      :key="weekDay"
      class="week"
    >
      <span class="week-day">
        {{ weekDay }}
      </span>
    </div>

    <div
      v-for="day in dates"
      :key="day"
      class="dates"
    >
      <button
        class="date"
        :class="{ 'active-date': selectedDate === day }"
        @click="selectDay(day)"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  gap: 1px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  padding: 16px;
  width: 318px;
  height: 286px;
  text-align: center;
}

.week-day {
  width: 40px;
  height: 20px;
  color: #757575;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  font-family: 'Geist', sans-serif;
}

.date {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  width: 40px;
  height: 40px;
  color: #1e1e1e;
  font-weight: 400;
  font-size: 16px;
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
