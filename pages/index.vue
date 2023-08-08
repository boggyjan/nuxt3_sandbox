<template>
  <div class="demo_1">
    <h1>Nuxt3</h1>
    <p>紀錄一下目前已知的問題：</p>
    <ul>
      <li>沒有loading bar 自刻了一個，但就只是換頁時會顯示而已，沒有跟$fetch連動</li>
      <li>用component標籤去放該頁body才需要的css的style標籤時，在離開頁面的時後不會被清掉</li>
      <li>dev時Eslint不會檢查，要用 npm run lint 指令才能檢查</li>
      <li>dev時TS不會做型別檢查，要用 npx nuxi typecheck 指令才能檢查，跟Eslint一樣</li>
      <li>換頁時，會先清掉該頁的變數（？），導致會有一瞬間看到原本應該要顯示變數的地方變成空白，然後才導到另一頁</li>
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