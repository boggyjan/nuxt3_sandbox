<template>
  <div>
    Test Render Error
    <hr>
    <div v-if="isMonday">
      isMonday: {{ isMonday }}
      <hr>
    </div>

    <button
      type="button"
      class="btn"
      @click="doSomething()"
    >
      doSomething()
    </button>
  </div>
</template>

<script>
export default {
  data () {
    const isMonday = process.server
      ? new Date(new Date().getTime() - 18 * 60 * 60 * 1000).getDay() === 1
      : new Date().getDay() === 1

    console.log(isMonday)

    return {
      isMonday
    }
  },

  methods: {
    doSomething () {
      console.log('doSomething()')
    }
  }
}
</script>
