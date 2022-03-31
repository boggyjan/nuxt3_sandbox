<template>
  <div class="reactive_api">
    <h1>Reactivity, Composition API test</h1>

    <h2>String</h2>
    <div class="string">
      <div class="data-grid">
        <div>
          <h3>myStr <small>"My String" will update</small></h3>
          <div>
            {{ myStr }}
            <input type="text" v-model="myStr">
          </div>
        </div>
      </div>
    </div>

    <h2>Array</h2>

    <div class="array">
      <button @click="pushToMyArrs()">push 7 to myArrs</button>
      <button @click="changeAllMyArrs()">change all myArrs</button>

      <div class="data-grid">
        <div>
          <h3>myArr1 <small>[1, 2, 3, ...] won't update</small></h3>
          <div v-for="item in myArr1">
            {{ item }}
          </div>
        </div>
        <div>
          <h3>myArr2 <small>ref([1, 2, 3, ...]) will update</small></h3>
          <div v-for="item in myArr2">
            {{ item }}
          </div>
        </div>
        <div>
          <h3>myArr3 <small>reactive([1, 2, 3, ...]) will update</small></h3>
          <div v-for="item in myArr3">
            {{ item }}
          </div>
        </div>
        <div>
          <h3>myArr4 <small>reactive([1, 2, 3, computed(), ...]) will update</small></h3>
          <div v-for="item in myArr4">
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <h2>Object</h2>

    <div class="object">
      <div class="action">
        <button @click="updateMyObjs()">update myObjects</button>
      </div>

      <div class="data-grid">
        <div>
          <h3>myObj1 <small>ref({ a: 1, b: 2, c: computed() })</small></h3>
          <div>
            {{ myObj1 }}
          </div>
        </div>
        <div>
          <h3>myObj2 <small>reactive({ a: 1, b: 2, c: computed() })</small></h3>
          <div>
            {{ myObj2 }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// 先說結論
// 要用ref還是reacive是要看你會要怎麼使用這個資料
// 如果是基本型別，就只能用ref
// 但如果是物件，就有兩個選項，如果有需要給整個物件重新賦值就選ref，否則就選reactive

// ---- String ----
const myStr = ref('My String')

watch(myStr, (val, oldVal) => {
  // console.log('watch myStr', val, oldVal)
})

// ---- Array ----
const myArr1 = [1, 2, 3]
const myArr2 = ref([1, 2, 3])
const myArr3 = reactive([1, 2, 3])
const myArr4 = reactive([1, 2, 3, computed(() => 4 * myArr4.length)])

// 會噴錯
// watch(myArr1, (val, oldVal) => {
//   console.log('myArr1', val, oldVal)
// })

watch(myArr2, (val, oldVal) => {
  // 要有deep才會觸發
  console.log('watch myArr2', val, oldVal)
}, { deep: true })
// watch 的第三個引數物件可以加入 immediate: true，可以在一開始就觸發

watch(myArr3, (val, oldVal) => {
  // console.log('watch myArr3', val, oldVal)
})

watch(myArr4, (val, oldVal) => {
  // console.log('watch myArr4', val, oldVal)
})

const pushToMyArrs = () => {
  // myArr1.push(7) // will through error
  myArr2.value.push(7)
  myArr3.push(7)
  myArr4.push(7)
}

const changeAllMyArrs = () => {
  myArr2.value.forEach((val, idx, arr) => arr[idx] = 0)
  myArr3.forEach((val, idx, arr) => arr[idx] = 0)
  myArr4.forEach((val, idx, arr) => arr[idx] = typeof arr[idx] === 'number' ? 0 : arr[idx])
}


// ---- Object ----
const myObj1 = ref({
  a: 1,
  b: 2,
  c: computed(() => myObj1.value.a + myObj1.value.b)
})

const myObj2 = reactive({
  a: 1,
  b: 2,
  c: computed(() => myObj2.a + myObj2.b + 1)
})

const updateMyObjs = () => {
  myObj1.value.a *= 2
  myObj1.value.b *= 4
  myObj2.a *= 2
  myObj2.b *= 4
}

watch(myObj1, (val, oldVal) => {
  // 要有deep才會觸發
  // console.log('watch myObj1', val, oldVal)
}, { deep: true })

watch(myObj2, (val, oldVal) => {
  // 會觸發
  // console.log('watch myObj2', val, oldVal)
})

// watchEffect 沒辦法watch整個物件，只能監視物件中的內容
watchEffect(() => {
  // watch 一個string
  // console.log('watchEffect myStr', myStr.value)

  // watch 一個ref陣列中的項目
  // console.log('watchEffect myArr2', myArr2.value[2])

  // watch 一個reactive array中的項目
  // console.log('watchEffect myArr3', myArr3[2])

  // watch 一個不存在的array中的項目也可以
  // console.log('watchEffect myArr3', myArr3[5])

  // watch 一個array中的computed項目 (computed項目記得要加value)
  // console.log('watchEffect myArr4', myArr4[3].value)

  // watch 一個ref object的值
  // console.log('watchEffect myObj1', myObj1.value.a)

  // watch 一個reactive object的值
  // console.log('watchEffect myObj2', myObj2.a)
})

// 一個回傳基本型態的computed
const computed1 = computed(() => 1 + myArr1[0])
// console.log(computed1.value)

// 一個回傳物件型態的computed
const computed2 = computed(() => {
  return { a: 1 + myArr1[0] }
})
// console.log(computed2.value)


// ---- toRaw() and unref() ----
// toRaw() 將ref, reactive物件轉換回一般物件
// ref直接用unref() 即可
const refStr = 'myStr'
const refArr = ref([1, 2, 3])
const refObj = ref({ a: 1, b: 2 })

const refStrToRaw = toRaw(refStr) // 基本型別的ref加上.value會失敗
const refArrToRaw = toRaw(refArr.value)
const refObjToRaw = toRaw(refObj.value)

console.log('refStrToRaw', refStrToRaw)
console.log('refArrToRaw', refArrToRaw)
console.log('refObjToRaw', refObjToRaw)

const refStrUnref = unref(refStr)
const refArrUnref = unref(refArr)
const refObjUnref = unref(refObj)

console.log('refStrUnref', refStrUnref)
console.log('refArrUnref', refArrToRaw)
console.log('refObjUnref', refObjToRaw)

const reactiveArr = reactive([1, 2, 3])
const reactiveObj = reactive({ a: 1, b: 2 })

const reactiveArrToRaw = toRaw(reactiveArr)
const reactiveObjToRaw = toRaw(reactiveObj)

// console.log('reactiveArrToRaw', reactiveArrToRaw)
// console.log('reactiveObjToRaw', reactiveObjToRaw)
</script>

<style lang="scss">
.reactive_api {
  .data-grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 25px;
  }
}
</style>