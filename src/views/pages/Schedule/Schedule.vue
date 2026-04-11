<template>
  <div className="card">
    <div class="font-semibold text-xl mb-4">Lịch làm việc</div>
    <VCalendar
      :attributes="attributes"
      borderless
      transparent
      :isDark="isDarkTheme"
      expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="my-day-cell text-center">
          <div class="p-10">{{ day.day }}</div>
          <ul>
            <li
              v-for="attr in attributes"
              :key="attr.key"
            >
              {{ attr.customData.title }}
            </li>
          </ul>
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<script lang="ts" setup>
import { useLayout } from '@/layout/composables/layout'
import { ref } from 'vue'

const { isDarkTheme } = useLayout()
const attributes = ref([
  {
    dates: new Date(),
    customData: {
      title: 'Duy'
    }
  }
])
</script>
