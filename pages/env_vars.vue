<template>
  <div>
    <h2>ENV variables ($config)</h2>
    <div>
      $config.public.BASE_URL: {{ $config.public.BASE_URL }}
    </div>
    <div>
      $config.public.DOMAIN: {{ $config.public.DOMAIN }}
    </div>
    <div>
      $config.public.NODE_ENV: {{ $config.public.NODE_ENV }}
    </div>
  </div>
</template>

<script setup>
const $config = useRuntimeConfig()

// 這個client端看不到
console.log($config.apiSecret)

onMounted(() => {
  // 關於config的設定看nuxt.config.ts
  console.log($config.public.BASE_URL)
  console.log($config.public.DOMAIN)
  console.log($config.public.NODE_ENV)
})
</script>