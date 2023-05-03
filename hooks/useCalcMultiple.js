import { ref, watch } from 'vue'

export function useCalcMultiple(a, b) {
  const result = ref(0)

  function calc () {
    result.value = a.value * b.value
  }

  watch(a, calc)
  watch(b, calc)
  calc()

  return result
}
