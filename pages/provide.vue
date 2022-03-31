<template>
  <div>
    <h2>provide, inject demo</h2>
    <div>
      location1: <input type="text" v-model="location1"> {{ location1 }}
    </div>
    <div>
      location2: <input type="text" v-model="location2"> {{ location2 }}
    </div>

    <Inject />
  </div>
</template>

<script setup>
// set provide in Composition API
let location1 = ref('Taipei')
provide('location1', location1)
</script>

<script>
export default {
  data () {
    return {
      // 因為基本類型無法在Option API中使用ref()
      // 因此若是在Inject component中對location2進行修改，這邊的是不會跟著更新的
      location2: 'Tainan',
    }
  },
  // set provide in Option API
  provide () {
    return {
      location2: this.location2
    }
  }
}
</script>