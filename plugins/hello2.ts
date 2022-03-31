import { defineNuxtPlugin } from '#app'
// import { useNuxtApp } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('hello2', msg => `Hello2 ${msg}!`);
  // const { $hello } = useNuxtApp()
  // console.log($hello)
})

declare module '#app' {
  interface NuxtApp {
    $hello2 (msg: string): string
  }
}
