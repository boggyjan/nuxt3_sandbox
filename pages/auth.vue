<template>
  <div>
    <NuxtLink to="/member">
      Member
    </NuxtLink>
    |
    <NuxtLink to="/story/1">
      Nested page with auth required
    </NuxtLink>
    |
    <NuxtLink to="/story/1">
      Nested page with auth required (Story 1)
    </NuxtLink>
    |
    <NuxtLink to="/login">
      Login
    </NuxtLink>

    <hr>
    注意：用來對每個auth或guest的頁面設定middleware的「definePageMeta」method「只能」放在頁面，放在layout或放在component裡都會失效！

    <hr>
    isLogin:
    {{ isLogin }}
    <hr>

    <button @click="setLogin()">
      Set to logged in
    </button>
    <button @click="setLogout()">
      Set to logout
    </button>
  </div>
</template>

<script setup>
const isLogin = useState('isLogin')

function setLogin () {
  isLogin.value = true
}

function setLogout () {
  isLogin.value = false
}
</script>
