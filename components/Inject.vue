<template>
  <div>
    <h3>components/Inject.vue</h3>
    <div>
      location1: <input type="text" v-model="location1">
    </div>
    <div>
      location2: <input type="text" v-model="location2">
    </div>
  </div>
</template>

<script setup>
// inject in Composition API
const location1 = inject('location1')
</script>

<script>
// inject in Option API
export default {
  inject: ['location2'],
  // 當location1 也在Option API inject時，上方v-model需改成 location1.value 因為 location1是ref() 卻在 Option API 做 inject 導致需要這樣處理

  // mounted () {
  //   console.log(this.location1)
  //   console.log(this.location2)
  // }
}
</script>