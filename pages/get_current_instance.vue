<template>
  <div class="getCurrentInstance">
    <h2>getCurrentInstance()</h2>
    <div>
      checkout out code and console.
    </div>
  </div>
</template>

<script setup>
const curInst = getCurrentInstance()
setTimeout(() => {
  console.log(curInst.data.greeting)
}, 1000)
</script>

<script>
export default {
  data () {
    return {
      greeting: 'yoyoyoyo'
    }
  }
}
</script>