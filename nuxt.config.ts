import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.scss'
  ],

  typescript: {
    strict: true
  },
  // server: {} 已經停用，要指定port請參考 https://v3.nuxtjs.org/getting-started/commands/

  publicRuntimeConfig: {
    // 正式站domain
    DOMAIN: process.env.DOMAIN,
    // api url
    BASE_URL: process.env.BASE_URL,
    // env
    NODE_ENV: process.env.NODE_ENV
  },

  privateRuntimeConfig: {
  }
})
