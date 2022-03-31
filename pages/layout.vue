<template>
  <NuxtLayout :name="themeType">
    <div>
      <h3>Layout demo</h3>
      <div>
        更換layout已經不再使用layout: 'dark' 這樣的寫法了，直接在template裡用NuxtLayout comp即可
        <div>
          <button @click="themeType = 'light'">Light</button>
          <button @click="themeType = 'dark'">Dark</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const themeType = ref('dark')
</script>