<template>
  <div class="dark-theme">
    Dark theme
    <component :is="'style'">
      body {
        background: #000;
        color: #fff;
      }
    </component>

    <slot />
  </div>
</template>
