import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('hello', msg => `Hello ${msg}!`);
})
