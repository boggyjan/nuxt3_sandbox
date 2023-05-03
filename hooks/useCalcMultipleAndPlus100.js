import { ref, watch } from 'vue'
import { useCalcMultiple } from '@/hooks/useCalcMultiple'

// 這是一個Hook之中使用另一個Hook的Sample
export function useCalcMultipleAndPlus100(a, b) {
  const result = ref(0)

  function calc () {
    result.value = a.value * b.value + 100
  }

  watch(a, calc)
  watch(b, calc)
  calc()

  return result
}
