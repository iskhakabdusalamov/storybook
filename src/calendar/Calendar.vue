<script setup lang="ts">
import { ref, computed } from 'vue'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const shortMonths = [
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
const selectedDate = ref<number | null>(today.getDate())

function selectDate(day: number) {
  selectedDate.value = day
}

function prevMonth() {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value -= 1
  } else {
    selectedMonth.value -= 1
  }
  selectedDate.value = null
}

function nextMonth() {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value += 1
  } else {
    selectedMonth.value += 1
  }
  selectedDate.value = null
}

const currentMonthName = computed(() => shortMonths[selectedMonth.value])
const currentYear = computed(() => selectedYear.value)

const dayInMonth = computed(() =>
  new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate(),
)

const firstDayIndex = computed(() => {
  const firstDay = new Date(selectedYear.value, selectedMonth.value, 1).getDay()
  return firstDay === 0 ? 6 : firstDay - 1
})

const calendarDays = computed<(number | null)[]>(() => {
  const days: (number | null)[] = []

  for (let i = 0; i < firstDayIndex.value; i++) {
    days.push(null)
  }

  for (let day = 1; day <= dayInMonth.value; day++) {
    days.push(day)
  }

  return days
})
</script>

<template>
  <div class="flex w-79.5 flex-col gap-4 rounded-2xl border border-[#d9d9d9] p-4">
    <div class="flex items-center justify-center gap-4">
      <button
        class="h-9 w-9 cursor-pointer bg-transparent"
        @click="prevMonth"
      >
        <img src="/arrow-left.svg" />
      </button>

      <div class="flex w-45.5 items-center justify-center gap-2">
        <button class="flex items-center gap-1 rounded-lg border border-[#d9d9d9] p-1.5">
          <p class="w-12.75 text-left">{{ currentMonthName }}</p>
          <img src="/arrow-bottom.svg" />
        </button>

        <button class="flex items-center gap-1 rounded-lg border border-[#d9d9d9] p-1.5">
          <p class="w-12.75 text-left">{{ currentYear }}</p>
          <img src="/arrow-bottom.svg" />
        </button>
      </div>

      <button
        class="h-9 w-9 cursor-pointer bg-transparent"
        @click="nextMonth"
      >
        <img src="/arrow-right.svg" />
      </button>
    </div>

    <div class="grid min-h-[calc(6*40px)] grid-cols-7 place-items-center">
      <div
        v-for="weekDay in weekDays"
        :key="weekDay"
      >
        <span class="font-geist h-5 w-10 text-xs leading-normal font-normal text-[#757575]">
          {{ weekDay }}
        </span>
      </div>

      <div
        v-for="(day, index) in calendarDays"
        :key="index"
      >
        <button
          v-if="day"
          :data-active="selectedDate === day"
          @click="selectDate(day)"
          class="font-geist h-10 w-10 cursor-pointer rounded-lg bg-transparent text-base leading-normal font-normal text-[#1e1e1e] hover:bg-[#f5f5f5] data-[active=true]:bg-[#2c2c2c] data-[active=true]:text-[#f5f5f5] data-[active=true]:hover:bg-[#2c2c2c]"
        >
          {{ day }}
        </button>

        <div
          v-else
          class="h-10 w-10"
        />
      </div>
    </div>
  </div>
</template>
