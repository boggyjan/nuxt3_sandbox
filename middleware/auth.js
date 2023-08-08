export default defineNuxtRouteMiddleware((to, from) => {
  // navigateTo('/')
  // abortNavigation()

  const isLogin = useState('isLogin').value

  if (!isLogin) {
    return navigateTo('/login')
  }
})

// Add the codes below to all pages that required auth
// definePageMeta({
//   middleware: 'auth'
// })
