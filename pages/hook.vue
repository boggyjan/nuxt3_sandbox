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

    <hr>

    <input
      v-model.number="n1"
      type="number"
    >
    <br>
    <input
      v-model.number="n2"
      type="number"
    >
    <br>
    useCalcMultiple(n1, n2): {{ n3 }}
    <br>
    useCalcMultipleAndPlus100(n1, n2): {{ n4 }}
  </div>
</template>

<script setup>
import { useMousePosition } from '@/hooks/useMousePosition'
import { useCalcMultiple } from '@/hooks/useCalcMultiple'
import { useCalcMultipleAndPlus100 } from '@/hooks/useCalcMultipleAndPlus100'
const { x, y, sqr } = useMousePosition()
const n1 = ref(2)
const n2 = ref(12)
const n3 = useCalcMultiple(n1, n2)
const n4 = useCalcMultipleAndPlus100(n1, n2)
</script>