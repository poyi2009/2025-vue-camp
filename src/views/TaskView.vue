<script setup>
import { ref, computed, provide } from 'vue'
import TaskProductList from '../components/TaskProductList.vue'
import TaskCartItem from '../components/TaskCartItem.vue'
import TaskToasts from '../components/TaskToasts.vue'

const data = ref([
  {
    id: 1,
    name: '耳罩式藍牙耳機',
    description: '舒適配戴，支援降噪技術',
    price: 2490,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: '耳罩式彩虹耳機',
    description: '舒適配戴，支援降噪技術',
    price: 1380,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: '時尚藍芽耳機',
    description: '舒適配戴，支援降噪技術',
    price: 7990,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: '機械式鍵盤',
    description: '紅軸機械鍵盤，打字手感極佳',
    price: 1890,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: '無線滑鼠',
    description: '靜音按鍵設計，長效電池',
    price: 890,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
])
const cart = ref([])
const toasts = ref([])
//通知
provide('toasts', toasts)
const addToasts = (message) => {
  toasts.value.push({
    id: new Date().getTime(),
    message,
  })
  setTimeout(() => {
    toasts.value.shift()
  }, 2000)
}
const handleCloseToast = (id) => {
  const index = toasts.value.findIndex((toast) => toast.id === id)
  toasts.value.splice(index, 1)
}
//購物車
const handleAddToCart = (id) => {
  const index = cart.value.findIndex((item) => item.id === id)
  const existProduct = data.value.find((item) => item.id === id)
  if (index !== -1) {
    cart.value[index].quantity += 1
    addToasts(`已更新「${existProduct.name}」購物車商品數量`)
    return
  }
  cart.value.push({
    ...existProduct,
    quantity: 1,
  })
  addToasts(`「${existProduct.name}」已加入購物車`)
}
const handleDeleteFromCart = (id) => {
  const index = cart.value.findIndex((item) => item.id === id)
  const deleteCartItem = cart.value.splice(index, 1)
  addToasts(`「${deleteCartItem[0].name}」已從購物車移除`)
}
//購物車總金額
const sum = computed(() => {
  return cart.value.reduce((pre, item) => {
    return pre + item.price * item.quantity
  }, 0)
})
</script>

<template>
  <div id="app" class="container py-4">
    <div class="row">
      <!-- 商品列表區 -->
      <div class="col-md-8">
        <h2 class="mb-3">商品列表</h2>
        <div class="row">
          <TaskProductList :data="data" @add-to-cart="handleAddToCart" />
        </div>
      </div>
      <!-- 購物車區 -->
      <div class="col-md-4">
        <h2 class="mb-3">購物車</h2>
        <div class="text-center alert alert-primary" v-if="cart.length === 0">請選購商品</div>
        <div>
          <TaskCartItem :cart="cart" @delete-from-cart="handleDeleteFromCart" />
        </div>
        <div>總金額：$ {{ sum }}</div>
      </div>
    </div>
    <!-- 通知元件 -->
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
      <div class="toast show align-items-center text-white bg-success border-0">
        <TaskToasts @close-toast="handleCloseToast" />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: #f2f2f2f2;
}

.card-img-top {
  height: 150px;
  object-fit: cover;
}
</style>
