<script setup>
const props = defineProps({
  order: { type: Object, require: true },
})
</script>
<template>
  <div class="card-body">
    <div class="card-title">
      <h5>訂單</h5>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">品項</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in props.order.list" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.subtotal }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        備註: <span>{{ props.order.note }}</span>
      </div>
      <div class="text-end">
        <h5>
          總計: <span>${{ props.order.total }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>
