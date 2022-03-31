<template>
  <div>
    <h2>Suspense</h2>
    <suspense>
      <template #default>
        <AsyncComp />
      </template>
      <template #fallback>
        <div>發生Error</div>
      </template>
    </suspense>
  </div>
</template>

<script>
export default {
  components: {
    AsyncComp: defineAsyncComponent(() => import('../components/ErrorComp.vue'))
    // AsyncComp: defineAsyncComponent(() => import('../components/Inject.vue'))
  }
}
</script>