<template>
  <div>
    <h2>v-model 雙向綁定</h2>
    myStr: {{ myStr }}

    <h3>input可以直接用v-model實現two way binding</h3>
    <input v-model="myStr">

    <h3>給component多種資料時，可以用v-model:attr</h3>
    <p>component內的input 要用:value="attrs.attr1" @input="emit('update:attr1', $event.target.value)" 來避開會覆寫母層資料會噴錯的問題</p>
    <Vmodel v-model:myStr="myStr" />

    <hr>

    <h2>checkbox v-model alias to a array</h2>
    <div>
      <label>
        <input type="checkbox" value="Julian" v-model="selectedCheckbox">
        Julian
      </label>
      <label>
        <input type="checkbox" value="Pertrisha" v-model="selectedCheckbox">
        Pertrisha
      </label>
      <label>
        <input type="checkbox" value="Joan" v-model="selectedCheckbox">
        Joan
      </label>
    </div>
    selectedCheckbox: {{ selectedCheckbox }} | {{ selectedCheckbox.length }}
  </div>
</template>

<script setup>
const myStr = ref('Hello, this is my string.')

const selectedCheckbox = ref([])
</script>