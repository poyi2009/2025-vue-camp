<script setup>
import { inject } from 'vue'
const toastMessage = inject('toast')
const toastType = inject('toastType')
//關閉通知
const emit = defineEmits(['close-toast'])
const closeToast = () => {
  emit('close-toast')
}
</script>
<template>
  <div
    class="toast show align-items-center text-white border-0"
    :class="{ 'bg-success': !toastType, 'bg-danger': toastType }"
  >
    <div class="d-flex">
      <div class="toast-body">{{ toastMessage }}</div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        @click="closeToast()"
      ></button>
    </div>
  </div>
</template>
