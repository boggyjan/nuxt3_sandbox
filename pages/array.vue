<template>
  <div class="array_1">
    <h1>Array test</h1>
    <div>
      {{ myArray }}
    </div>
    <div>
      {{ myArray2 }}
    </div>
    <div>
      {{ myArray3 }}
    </div>
    <div>
      {{ myArray4 }}
    </div>
    <div @click="plus()">
      {{ count }}
    </div>
  </div>
</template>

<script setup>
let count = ref(0)
let myArray = ref([1, 2, 3])
const myArray2 = reactive([{ a: 1 }, { a: 2 }, { a: 3 }])
const myArray3 = reactive({ a: [1, 2, 3] })

function plus () {
  count.value++
  console.log('plus', count.value)
}

onMounted(() => {
  setTimeout(() => {
    console.log('change single item')
    myArray.value[2] = {
      type: 'book',
      name: 'yoyoyo book'
    }
  }, 1000)
})

onMounted(() => {
  setTimeout(() => {
    console.log('use push')
    myArray.value.push(10)
  }, 2000)
})

onMounted(() => {
  setTimeout(() => {
    console.log('reassign value')
    myArray.value = [1, 2, 3, 4, 5, 6]
  }, 3000)
})

console.log(myArray)
console.log(unref(myArray))
</script>

<script>
export default {
  data () {
    return {
      myArray4: [1, 2, 3]
    }
  },
  mounted () {
    setTimeout(() => {
      this.myArray4[0] = 10
    }, 3000)
  }
}
</script>