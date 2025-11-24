<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref<string | null>(null)

const selectDate = (day: string) => {
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
          @click="selectDate(day)"
        >
          {{ day }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  padding: 16px;
  width: 318px;
  height: 308px;
}

.block {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.select-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 182px;
}

.month-field,
.year-field {
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-left,
.arrow-right {
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 8px;
}

.table {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
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
