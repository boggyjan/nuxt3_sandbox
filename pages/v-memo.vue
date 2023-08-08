<template>
  <div>
    <h2>v-memo v-for中可以用v-memo列出條件，當條件結果有變動時更新列表</h2>
    <div
      v-for="item in list"
      :key="item.id"
      v-memo="[item.id === selected]"
    >
      <p>ID: {{ item.id }} - {{ item.name }}- selected: {{ item.id === selected }}</p>
    </div>
    <div>
      selected: {{ selected }}
    </div>
    <div>
      <button @click="selected++">selected+</button>
      <button @click="list[2].name = 'Peter'">change [2] name</button>
      <button @click="list[2].name = 'Jackson'">change [2] name 2</button>
    </div>
    <div>
      說明：先點一下change [2] name後，點兩次selected+，會發現第三個人的name這時才會更新。此時再點change [2] name 2，再點一下selected+，這時因為selected又變成false，導致第三個人的name再度被更新
    </div>
  </div>
</template>

<script setup>
// v-memo demo
const selected = ref(0)
const list = reactive([
  {
    id: 0,
    name: 'Julian'
  },
  {
    id: 1,
    name: 'Pertrisha'
  },
  {
    id: 2,
    name: 'Joan'
  }
])
</script>