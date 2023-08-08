<template>
  <div>
    Member Page (Auth Required)
    <hr>
    Please check auth.vue to see full Example and desciptions.
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
