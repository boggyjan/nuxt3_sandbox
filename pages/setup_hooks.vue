<template>
  <div class="setup-hooks">
    <h2>常用的hook</h2>
    <p>route, attrs, props, state, slots, emit and lifecycle hooks...等等，請看原始碼</p>

    <h3>useState 的練習</h3>
    <div class="cart">
      <div v-for="item in cart.items" v-if="cart.items">
        {{ item.title }} - ${{ item.price }} x {{ item.qty }}
      </div>
      Total: ${{ cart.totalPrice }}
    </div>

    <button type="button" @click="commit()">commit</button>
  </div>
</template>

<script setup>
/*
常用：
1. useRoute, useNuxtApp, useState, useAttrs
2. defineEmits, defineProps
3. watch, computed
4. $fetch
*/

// use route in setup
const route = useRoute()

const slots = useSlots()
const attrs = useAttrs()

// cookie的用法（超好用！）
const token = useCookie('token')
console.log(token)
// 寫入cookie
token.value = 'test12345'

// useState 會return一個ref
const { $hello, $hello2, $myStore } = useNuxtApp()
// $hello, $hello2 is a plugin
console.log($hello('boggy'))
console.log($hello2('test hello2!~~~~~~~~~~~~'))

// custom store
$myStore.commit('UPDATE_CART', {
  totalPrice: 1000,
  items: [
    {
      title: 'Pink Flowers',
      price: 200,
      qty: 2
    },
    {
      title: 'Pepper Mint',
      price: 150,
      qty: 4
    }
  ]
})
// alias to a store prop
const cart = computed(() => $myStore.states.value.cart)

const commit = () => {
  $myStore.commit('UPDATE_CART', {
    totalPrice: 1250,
    items: [
      {
        title: 'Pink Flowers',
        price: 200,
        qty: 2
      },
      {
        title: 'Pepper Mint',
        price: 150,
        qty: 4
      },
      {
        title: 'Milk',
        price: 250,
        qty: 1
      }
    ]
  })
}

// props
const props = defineProps({
  attr2: {
    type: String,
    default: 'Fuck'
  }
})

// provide and inject
const location1 = 'Taipei'
provide('location1', location1)
// const location1 = inject('location1')

// emit
const emit = defineEmits(['update:attr1', 'change'])

// life cycle hook
onMounted(() => {
  // xxxxx
})
</script>
