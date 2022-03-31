<template>
  <div class="test_ts">
    {{ locale }}
  </div>
</template>

<script setup lang="ts">
import EventType from '@/enum/EventType'

console.log('EventType', EventType)

// 發現TS型別檢查根本就不會噴錯
// 要用 npx nuxi typecheck 指令才能檢查

const test: string = 123123123;
const locale: number[] = ['1',2,3,4,5,'24'];

let isVisible = 'sdfsdf'
console.log(isVisible)

interface Person {
  name: string;
  age?: number
}

var p1: Person = {
  name: 'Peter',
  age: 20,
  nickname: 'PP'
}

console.log(p1)

</script>

<!-- <script setup>
// import ts enum
import EventType from '@/enum/EventType'

console.log('EventType', EventType)

const locale = ['1',2,3,4,5,'24']
</script> -->
