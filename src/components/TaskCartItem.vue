<script setup>
const props = defineProps({
  cart: {
    type: Array,
    require: true,
  },
})
const emit = defineEmits(['delete-from-cart'])
//刪除購物車商品
const deleteFromCart = (id) => {
  emit('delete-from-cart', id)
}
</script>
<template>
  <ul class="list-group mb-3" v-for="item in props.cart" :key="item.id">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h6 class="my-0">{{ item.name }}</h6>
        <small class="text-muted">數量：{{ item.quantity }}</small>
      </div>
      <div>
        <span class="text-muted">$ {{ item.price * item.quantity }}</span>
        <button class="btn btn-sm btn-outline-danger ms-2" @click="deleteFromCart(item.id)">
          移除
        </button>
      </div>
    </li>
  </ul>
</template>
