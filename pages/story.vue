<template>
  <div>
    Story
    <hr>
    <NuxtLink to="/story/1">
      Story 1
    </NuxtLink>
    <NuxtLink to="/story/2">
      Story 2
    </NuxtLink>
    <NuxtLink to="/story/3">
      Story 3
    </NuxtLink>
    <hr>
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
