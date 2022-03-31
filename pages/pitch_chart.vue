<template>
  <NuxtLayout name="dark">
    <div class="pitch-charts">
      <div class="main-control">
        Total Tracks <input type="range" :min="1" :max="10" v-model.number="chartCount">
        <span class="tracks">{{ chartCount }}</span>
      </div>

      <PitchChart v-for="i in chartCount" :key="'chart_' + i" />
    </div>
  </NuxtLayout>
</template>

<script setup>
const chartCount = ref(2)
</script>

<style lang="scss">
.pitch-charts {
  padding-top: 40px;

  input[type=range] {
    vertical-align: middle;
  }

  .main-control {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 10px;
    background: #333;
    color: #aaa;
    text-align: center;

    .tracks {
      padding: 0 5px;
      border-radius: 100px;
      background: #111;
      color: #aaa;
    }
  }
}
</style>