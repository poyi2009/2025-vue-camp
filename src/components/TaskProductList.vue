<script setup>
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
})
//加入購物車
const emit = defineEmits(['add-to-cart'])
const addToCart = (id) => {
  emit('add-to-cart', id)
}
</script>
<template>
  <div class="col-md-4 mb-4" v-for="item in props.data" :key="item.id">
    <div class="card h-100">
      <img v-bind:src="item.image" class="card-img-top" :alt="item.name" />
      <div class="card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <p class="card-text">{{ item.description }}</p>
        <p class="fw-bold text-primary">$ {{ item.price }}</p>
        <button class="btn btn-success w-100" @click="addToCart(item.id)">加入購物車</button>
      </div>
    </div>
  </div>
</template>
