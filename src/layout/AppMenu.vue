<script setup lang="ts">
import { ref, computed } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import { useUserStore } from '@/shared/store/user'
import { storeToRefs } from 'pinia'
import type { Menu } from '@/types/Authentication'

const userStore = useUserStore()
const { listMenus, userInfo } = storeToRefs(userStore)
const isAdmin = computed(() => userInfo.value.roleIds.includes('ff1dec77-36ec-48a8-82ca-02a9fd23230c'))

const model = ref<Menu[]>([
  {
    id: '1381f24b-8f42-4599-951e-ab1f0c5ddadb',
    label: 'Home',
    visible: isAdmin.value,
    items: [
      {
        id: 'fb448b3c-47bb-4173-9800-6eb9f5d700a8',
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/',
        visible: isAdmin.value
      }
    ]
  },
  {
    id: '04ed0aa7-cc44-43db-8c6b-5f6cbade95f9',
    label: 'UI Components',
    items: [
      {
        id: 'ba492c3e-3fdb-4b32-ab0b-f38e8665a7ee',
        label: 'Form Layout',
        icon: 'pi pi-fw pi-id-card',
        to: '/uikit/formlayout',
        visible: isAdmin.value
      },
      {
        id: '985dd8e0-9d91-4598-91aa-3937a0646cea',
        label: 'Input',
        icon: 'pi pi-fw pi-check-square',
        to: '/uikit/input',
        visible: isAdmin.value
      },
      {
        id: '16f06ed1-51a3-45e4-af09-d8689110d91c',
        label: 'Button',
        icon: 'pi pi-fw pi-mobile',
        to: '/uikit/button',
        class: 'rotated-icon',
        visible: isAdmin.value
      },
      {
        id: 'ea1e8435-8aa0-44d6-9006-3732d338aa24',
        label: 'Table',
        icon: 'pi pi-fw pi-table',
        to: '/uikit/table',
        visible: isAdmin.value
      },
      {
        id: '5e25aba1-c0f1-4c01-a18a-5c9f29e4a872',
        label: 'List',
        icon: 'pi pi-fw pi-list',
        to: '/uikit/list',
        visible: isAdmin.value
      },
      {
        id: 'fd4a4e42-89b3-4053-8696-a75c9ee76443',
        label: 'Tree',
        icon: 'pi pi-fw pi-share-alt',
        to: '/uikit/tree',
        visible: isAdmin.value
      },
      {
        id: '3398a6cf-5c46-4515-8f4e-fda57d50c1cd',
        label: 'Panel',
        icon: 'pi pi-fw pi-tablet',
        to: '/uikit/panel',
        visible: isAdmin.value
      },
      {
        id: '34027581-8188-4ade-a4b5-74ff7e221679',
        label: 'Overlay',
        icon: 'pi pi-fw pi-clone',
        to: '/uikit/overlay',
        visible: isAdmin.value
      },
      {
        id: '6ed50a63-d90e-408b-80b7-7f2241804f7c',
        label: 'Media',
        icon: 'pi pi-fw pi-image',
        to: '/uikit/media',
        visible: isAdmin.value
      },
      {
        id: '0ea4356f-2786-4452-a842-7722cbe23b9a',
        label: 'Menu',
        icon: 'pi pi-fw pi-bars',
        to: '/uikit/menu',
        visible: isAdmin.value
      },
      {
        id: 'e3c5bf52-db31-4ab6-82cc-e6b4115bbef3',
        label: 'Message',
        icon: 'pi pi-fw pi-comment',
        to: '/uikit/message',
        visible: isAdmin.value
      },
      {
        id: '2ebce991-3c80-4309-bdbb-87307e82c3ff',
        label: 'File',
        icon: 'pi pi-fw pi-file',
        to: '/uikit/file',
        visible: isAdmin.value
      },
      {
        id: '6604eba9-5d1d-4829-8a88-34b0b6b8faf3',
        label: 'Chart',
        icon: 'pi pi-fw pi-chart-bar',
        to: '/uikit/charts',
        visible: isAdmin.value
      },
      {
        id: '5726d40f-9778-4744-884f-17ab694e8e10',
        label: 'Timeline',
        icon: 'pi pi-fw pi-calendar',
        to: '/uikit/timeline',
        visible: isAdmin.value
      },
      {
        id: '10f12726-86ab-4910-8eae-089356106477',
        label: 'Misc',
        icon: 'pi pi-fw pi-circle',
        to: '/uikit/misc',
        visible: isAdmin.value
      }
    ],
    visible: isAdmin.value
  },
  {
    id: '1deab5ed-f71a-40cb-8c07-98a08fc3f305',
    label: 'Pages',
    visible: isAdmin.value,
    icon: 'pi pi-fw pi-briefcase',
    to: '/pages',
    items: [
      {
        id: '1deab5ed-f71a-40cb-8c07-98a08fc3f305',
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/landing',
        visible: isAdmin.value
      },
      {
        id: '1deab5ed-f71a-40cb-8c07-98a08fc3f305',
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        visible: isAdmin.value,
        items: [
          {
            id: '8dbf48e9-7155-4e17-82c5-8729627df807',
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            visible: isAdmin.value,
            to: '/auth/login'
          },
          {
            id: '8dbf48e9-7155-4e17-82c5-8729627df807',
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            visible: isAdmin.value,
            to: '/auth/error'
          },
          {
            id: '8dbf48e9-7155-4e17-82c5-8729627df807',
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            visible: isAdmin.value,
            to: '/auth/access'
          }
        ]
      },
      {
        id: '8dbf48e9-7155-4e17-82c5-8729627df807',
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        visible: isAdmin.value,
        to: '/pages/crud'
      },
      {
        id: '8dbf48e9-7155-4e17-82c5-8729627df807',
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        visible: isAdmin.value,
        to: '/pages/notfound'
      },
      {
        id: '8dbf48e9-7155-4e17-82c5-8729627df807',
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        visible: isAdmin.value,
        to: '/pages/empty'
      }
    ]
  },
  {
    id: '8dbf48e9-7155-4e17-82c5-8729627df807',
    label: 'Hierarchy',
    visible: isAdmin.value,
    items: [
      {
        id: '8dbf48e9-7155-4e17-82c5-8729627df807',
        label: 'Submenu 1',
        visible: isAdmin.value,
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            id: '8dbf48e9-7155-4e17-82c5-8729627df807',
            visible: isAdmin.value,
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { id: '1b587501-b80d-4dd6-a091-4916067de523', label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
              { id: '1b587501-b80d-4dd6-a091-4916067de523', label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
              { id: '1b587501-b80d-4dd6-a091-4916067de523', label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
            ]
          },
          {
            id: '1b587501-b80d-4dd6-a091-4916067de523',
            visible: isAdmin.value,
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { id: '1b587501-b80d-4dd6-a091-4916067de523', label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            ]
          }
        ]
      },
      {
        id: '1b587501-b80d-4dd6-a091-4916067de523',
        label: 'Submenu 2',
        visible: isAdmin.value,
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            id: '1b587501-b80d-4dd6-a091-4916067de523',
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { id: '1b587501-b80d-4dd6-a091-4916067de523', label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
              { id: '1b587501-b80d-4dd6-a091-4916067de523', label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
            ]
          },
          {
            id: '1b587501-b80d-4dd6-a091-4916067de523',
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { id: 'd92268c5-6dcf-454a-9475-c85debea0ad2', label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '1b587501-b80d-4dd6-a091-4916067de523',
    visible: isAdmin.value,
    label: 'Get Started',
    items: [
      {
        id: '1b587501-b80d-4dd6-a091-4916067de523',
        visible: isAdmin.value,
        label: 'Documentation',
        icon: 'pi pi-fw pi-book',
        to: '/documentation'
      },
      {
        id: '1b587501-b80d-4dd6-a091-4916067de523',
        visible: isAdmin.value,
        label: 'View Source',
        icon: 'pi pi-fw pi-github',
        url: 'https://github.com/primefaces/sakai-vue',
        target: '_blank'
      }
    ]
  }
])
const menus = computed(() => listMenus.value.concat(model.value))
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
