<template>
  <div>
    <NuxtLink to="/member">
      Member Page
    </NuxtLink>
    |
    <NuxtLink to="/login">
      Login Page
    </NuxtLink>

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
