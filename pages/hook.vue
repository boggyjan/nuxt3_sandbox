<template>
  <div>
    <h2>Custom hook demo</h2>
    <h3>useMousePosition hook</h3>
    <div>
      {{ x }}
      :
      {{ y }}
      =>
      {{ sqr }}
    </div>
  </div>
</template>

<script setup>
import { useMousePosition } from '@/hooks/useMousePosition'
const { x, y, sqr } = useMousePosition()
</script>