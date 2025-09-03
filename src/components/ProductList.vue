<script setup>
const props = defineProps({
  data: { type: Array, require: true },
})
const emit = defineEmits(['add-item'])
const addItem = (id) => {
  emit('add-item', id)
}
</script>
<template>
  <div class="list-group" v-for="item in props.data" :key="item.id">
    <a href="#" class="list-group-item list-group-item-action" @click.prevent="addItem(item.id)">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ item.name }}</h5>
        <small>${{ item.price }}</small>
      </div>
      <p class="mb-1">{{ item.description }}</p>
    </a>
  </div>
</template>
