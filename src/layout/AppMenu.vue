<script setup lang="ts">
import { computed } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import { useUserStore } from '@/shared/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { listMenus } = storeToRefs(userStore)

// Filter visible menus from the API response
const menus = computed(() => listMenus.value.filter((item) => item.visible !== false))
</script>

<template>
  <ul class="layout-menu">
    <template
      v-for="(item, i) in menus"
      :key="item.id"
    >
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li
        v-if="item.separator"
        class="menu-separator"
      ></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
