<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductList from '../components/ProductList.vue'
import CartList from '../components/CartList.vue'
import OrderItem from '../components/OrderItem.vue'
//初始
const data = ref([])
const cart = ref([])
const note = ref('')
const order = ref({
  list: [],
  total: 0,
  note: '',
})
const toasts = ref([])
const addToast = (message) => {
  toasts.value.push({ message })
  setTimeout(() => {
    toasts.value.shift()
  }, 3000)
}
onMounted(() => {
  data.value.push(
    {
      id: 1,
      name: '珍珠奶茶',
      description: '香濃奶茶搭配QQ珍珠',
      price: 50,
    },
    {
      id: 2,
      name: '冬瓜檸檬',
      description: '清新冬瓜配上新鮮檸檬',
      price: 45,
    },
    {
      id: 3,
      name: '翡翠檸檬',
      description: '綠茶與檸檬的完美結合',
      price: 55,
    },
    {
      id: 4,
      name: '四季春茶',
      description: '香醇四季春茶，回甘無比',
      price: 45,
    },
    {
      id: 5,
      name: '阿薩姆奶茶',
      description: '阿薩姆紅茶搭配香醇鮮奶',
      price: 50,
    },
    {
      id: 6,
      name: '檸檬冰茶',
      description: '檸檬與冰茶的清新組合',
      price: 45,
    },
    {
      id: 7,
      name: '芒果綠茶',
      description: '芒果與綠茶的獨特風味',
      price: 55,
    },
    {
      id: 8,
      name: '抹茶拿鐵',
      description: '抹茶與鮮奶的絕配',
      price: 60,
    },
  )
})
//加入購物車
const productAddToCart = (productId) => {
  const existItem = data.value.find((item) => item.id === productId)
  const cartItemIndex = cart.value.findIndex((item) => item.id === productId)
  //購物車內已有該商品
  if (cartItemIndex !== -1) {
    if (cart.value[cartItemIndex].quantity < 10) {
      cart.value[cartItemIndex].quantity += 1
      return
    }
    addToast(`${existItem.name} 選購數量已達上限`)
    return
  }
  //新增到購物車
  cart.value.push({
    id: existItem.id,
    name: existItem.name,
    description: existItem.description,
    price: existItem.price,
    quantity: 1,
  })
  addToast(`${existItem.name} 已加入購物車`)
}
//購物車商品總計
const sum = computed(() => {
  return cart.value.reduce((pre, item) => {
    return pre + item.price * item.quantity
  }, 0)
})
//刪除購物車品項
const delCartItem = (id) => {
  const index = cart.value.findIndex((item) => item.id === id)
  cart.value.splice(index, 1)
}
//送出訂單
const submitOrder = () => {
  order.value.list = cart.value.map((item) => {
    return {
      ...item,
      subtotal: item.price * item.quantity,
    }
  })
  order.value.total = sum.value
  order.value.note = note.value
  //清除購物車
  cart.value = []
  note.value = ''
  addToast(`訂單已送出`)
}
</script>
<template>
  <div id="root">
    <div class="container mt-5">
      <h2 class="text-center pb-4">WEEK 3 : 餐點管理工具</h2>
      <div class="row">
        <div class="col-md-4">
          <!--MENU-->
          <ProductList :data="data" @add-item="productAddToCart" />
        </div>
        <!--購物車-->
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <CartList :cart="cart" @delete-cart-item="delCartItem" />
            </tbody>
          </table>
          <div class="text-center alert alert-primary" v-if="cart.length === 0">請選購商品</div>
          <div v-else>
            <div class="text-end mb-3">
              <h5>
                總計: <span>${{ sum }}</span>
              </h5>
            </div>
            <textarea
              class="form-control mb-3"
              rows="3"
              placeholder="備註"
              v-model="note"
            ></textarea>
            <div class="text-end">
              <button class="btn btn-primary" @click="submitOrder">送出</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!--訂單-->
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="text-center alert alert-secondary" v-if="order.list.length === 0">
            尚未建立訂單
          </div>
          <div class="card" v-else>
            <OrderItem :order="order" />
          </div>
        </div>
      </div>
    </div>
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;700&display=swap');
.container {
  font-family: 'Oswald';
}
</style>
