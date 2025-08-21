<script setup>
import { inject } from 'vue'
const toastMessage = inject('toasts')
const emit = defineEmits(['close-toast'])
//關閉通知
const closeToast = (id) => {
  emit('close-toast', id)
}
</script>
<template>
  <div class="d-flex" v-for="toast in toastMessage" :key="toast.message">
    <div class="toast-body">{{ toast.message }}</div>
    <button
      type="button"
      class="btn-close btn-close-white me-2 m-auto"
      @click="closeToast(toast.id)"
    ></button>
  </div>
</template>
