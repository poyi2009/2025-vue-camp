<script setup>
const props = defineProps({
  cart: { type: Array, require: true },
})
//傳父
const emit = defineEmits(['delete-cart-item'])
const delCartItem = (id) => {
  emit('delete-cart-item', id)
}
//購物車商品小計
const itemSubtotal = (item) => {
  return item.price * item.quantity
}
</script>
<template>
  <tr v-for="item in props.cart" :key="item.id">
    <td>
      <button type="button" class="btn btn-sm" @click="delCartItem(item.id)">x</button>
    </td>
    <td>{{ item.name }}</td>
    <td>
      <small>{{ item.description }}</small>
    </td>
    <td>
      <select class="form-select" v-model="item.quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </td>
    <td>{{ item.price }}</td>
    <td>{{ itemSubtotal(item) }}</td>
  </tr>
</template>
