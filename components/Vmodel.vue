<template>
  <div>
    <div>子原件用v-model會噴錯</div>
    <input v-model="attrs.myStr">
    <div>下面這樣不會噴錯</div>
    <input :value="attrs.myStr" @input="$emit('update:myStr', $event.target.value)">
  </div>
</template>

<script setup>
const attrs = useAttrs()
</script>
