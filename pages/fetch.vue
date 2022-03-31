<template>
  <div class="animation-maker">
    <button @click="getMarketData(timeData)">getMarketData(timeData)</button>

    <div>
      {{ timeData }}
    </div>
  </div>
</template>

<script setup>
// $fetch 是用ohmyfetch 更詳細說明請見：https://github.com/unjs/ohmyfetch
// 
// const data = await $fetch('http://worldtimeapi.org/api/timezone/Asia/Taipei')
// useFetch, useAsyncData 有何不同？應該就跟nuxt2一樣

async function getMarketData (ref) {
  try {
    const { data } = await useAsyncData('market',
      () => $fetch('http://worldtimeapi.org/api/timezone/Asia/Taipei',
      { parseResponse: JSON.parse }),
      { pick: ['datetime'] } // pick: ['datetime', 'timezone']
    )

    // const data = await useFetch('http://worldtimeapi.org/api/timezone/Asia/Taipei', { parseResponse: JSON.parse, pick:  ['data', 'status'] })

    ref.value = data
  } catch {
    return {}
  }
}

const timeData = ref({})

await getMarketData(timeData)
</script>
