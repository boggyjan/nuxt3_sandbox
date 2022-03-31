<template>
  <div class="reactive_api">
    <h1>effectScope</h1>
  </div>
</template>

<script setup>
// effectScope怎麼用還要弄清楚

// ---- 測試effectScope begin
const counter = ref(1)

watch(counter, (val, oldVal) => {
  console.log('watch counter changed', val, oldVal)
})

watchEffect(() => {
  console.log('watchEffect counter changed', counter.value)
})

console.log('counter.value += 2')
counter.value += 2

const scope = effectScope()

scope.run(() => {
  watch(counter, (val, oldVal) => {
    console.log('watch counter changed2', val, oldVal)
  })

  watchEffect(() => {
    console.log('watchEffect counter changed2', counter.value)
  })

  counter.value += 2
})

scope.stop()
// ---- 測試effectScope end
</script>
