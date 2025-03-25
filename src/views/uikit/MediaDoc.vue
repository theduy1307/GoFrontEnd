<script setup lang="ts">
import { PhotoService } from '@/service/PhotoService'
import { ProductService } from '@/service/ProductService'
import type { HintedString } from '@primevue/core'
import { onMounted, ref } from 'vue'

const products = ref<any>([])
const images = ref<any>([])
const galleriaResponsiveOptions = ref<any>([
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '960px',
    numVisible: 4,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },
])
const carouselResponsiveOptions = ref<any>([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1,
  },
])

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data))
  PhotoService.getImages().then((data) => (images.value = data))
})

function getSeverity(
  status: string,
): HintedString<'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'> | undefined {
  switch (status) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return
  }
}
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Carousel</div>
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
              <div class="dark:bg-surface-900 absolute rounded-border" style="left: 5px; top: 5px">
                <Tag
                  :value="slotProps.data.inventoryStatus"
                  :severity="getSeverity(slotProps.data.inventoryStatus)"
                />
              </div>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>

  <div class="card">
    <div class="font-semibold text-xl mb-4">Image</div>
    <Image
      src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg"
      alt="Image"
      width="250"
    />
  </div>

  <div class="card">
    <div class="font-semibold text-xl mb-4">Galleria</div>
    <Galleria
      :value="images"
      :responsiveOptions="galleriaResponsiveOptions"
      :numVisible="5"
      containerStyle="max-width: 640px"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
      </template>
    </Galleria>
  </div>
</template>
