<template>
  <div>
    Login Page (Guest Only)
    <hr>
    Please check auth.vue to see full Example and desciptions.
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'guest'
})
</script>
