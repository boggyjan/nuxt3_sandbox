<template>
  <div>
    <h3>Layout demo</h3>
    <div>
      Nuxt3 指定 layout，直接在template裡加個「NuxtLayout」component即可
      <div>
        <NuxtLayout :name="themeType" />
        <button @click="themeType = 'light'">Light</button>
        <button @click="themeType = 'dark'">Dark</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const themeType = ref('dark')
</script>