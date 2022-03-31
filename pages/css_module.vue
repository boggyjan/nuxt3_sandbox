<template>
  <div>
    <p :class="[$style.red, $style.w500]">
      test
      <span>test2</span>
    </p>
  </div>
</template>

<style module lang="scss">
.red {
  color: red;
}

.w500 {
  width: 500px;
  border: 1px solid #F00;

  span {
    color: #04f;
  }
}
</style>
