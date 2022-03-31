import { defineNuxtPlugin, useState } from '#app'

// const store = 

// 想要弄成類似store一樣的東西，但目前就先這樣
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('myStore', {
    states: useState('store', () => {
      return {
        cart: {
          totalPrice: 0,
          items: []
        }
      }
    }),
    getters: {},
    actions: {},
    mutations: {
      UPDATE_CART (data) {
        this.states.value.cart = data
      }
    },
    commit (commitId, ...args) {
      if (this.mutations[commitId]) {
        this.mutations[commitId].apply(this, args)
      }
    }
  })
})
