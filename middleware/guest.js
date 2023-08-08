export default defineNuxtRouteMiddleware((to, from) => {
  // navigateTo('/')
  // abortNavigation()

  const isLogin = useState('isLogin').value

  if (isLogin) {
    return navigateTo('/member')
  }
})

// Add the codes below to all pages that guest only
// definePageMeta({
//   middleware: 'guest'
// })
