<template>
  <div>
    <h1>Dynamic Route</h1>
    <div>
      User Type (useRoute): {{ route.params }}
    </div>
    <div>
      query (useRoute): {{ route.query }}
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'

// How to get query, params:
// use route in setup
const router = useRouter()
const route = useRoute()
console.log('dynamic-route-[type].vue router', router)
console.log('dynamic-route-[type].vue route', route)
</script>

<script>
export default {
  mounted () {
    console.log(this.$route.params.type)
  }
}
</script>
