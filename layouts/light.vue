<template>
  <div class="light-theme">
    Light theme
    <component :is="'style'">
      body {
        background: initial;
      }
    </component>

    <slot />
  </div>
</template>
