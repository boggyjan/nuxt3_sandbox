<template>
  <div class="default-theme">
    <NuxtLoading ref="loading" />

    <component :is="'style'">
      body {
        background: initial;
      }
    </component>

    <div class="main">
      <slot />
    </div>

    <div class="footer">
      <NuxtLink :to="{ name: 'index' }">Back</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const loading = ref(null)

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:start", () => {
  loading.value.start()
})

nuxtApp.hook("page:finish", () => {
  loading.value.finish()
})
</script>

<style lang="scss">
body {
  margin: 0;
}

a {
  color: #36c;
}

.main {
  padding: 25px;
}

.footer {
  margin-top: 100px;
  padding: 25px;
  background: #111;
  color: #eee;

  a {
    color: #fff;

    &.router-link-active {
      display: none;
    }
  }
}
</style>