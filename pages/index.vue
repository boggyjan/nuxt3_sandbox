<template>
  <div class="demo_1">
    <h1>Nuxt3</h1>
    <p>紀錄一下目前已知的問題：</p>
    <ul>
      <li>沒有loading bar 自刻了一個，但就只是換頁時會顯示而已，沒有跟$fetch連動</li>
      <li>dev時Eslint不會檢查，要用 npm run lint 指令才能檢查</li>
      <li>dev時TS不會做型別檢查，要用 npx nuxi typecheck 指令才能檢查，跟Eslint一樣</li>
    </ul>

    <div class="test-box">
      <h2>All pages</h2>
      <div class="test-routes">
        <NuxtLink
          v-for="route in $router.options.routes
            .filter(item => item.name.replace(/__.+/, '') !== 'index')"
          :key="`link_${route.name}`"
          :to="{
            name: route.name,
            ...(() => {
              // 有一個特殊的dynamic route(dynamic-route-[type])是一定要帶入param的：
              if (route.name === 'dynamic-route-type') {
                return { params: { type: 'admin' } }
              } else {
                return {}
              }
            })()
          }"
          class="route-link"
        >
          {{ route.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.test-routes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;

  .route-link {
    display: block;
    width: fit-content;
  }
}
</style>