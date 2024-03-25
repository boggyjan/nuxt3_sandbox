<script setup>
const visible = ref(false)
const count = ref(5)
const items = ref([
  { id: 0, text: 1 },
  { id: 1, text: 2 },
  { id: 2, text: 3 },
  { id: 3, text: 4 },
  { id: 4, text: 5 }
])
const removedItems = ref([])

function removeItem (target) {
  removedItems.value.push(items.value.find((item) => item === target))
  items.value = items.value.filter((item) => item !== target)
}

function restoreItem (target) {
  items.value.push(removedItems.value.find((item) => item === target))
  removedItems.value = removedItems.value.filter((item) => item !== target)
}

function addItem () {
  const random = Math.floor(Math.random() * items.value.length)

  const newItem = {
    id: count.value,
    text: random
  }
  count.value++
  items.value.push(newItem)
}

function sortItems () {
  items.value.sort((a, b) => {
    // return a.text.localeCompare(b.text)
    return a.text - b.text
  })
}

function sortRemovedItems () {
  removedItems.value.sort((a, b) => {
    // return a.text.localeCompare(b.text)
    return a.text - b.text
  })
}
</script>

<template>
  <div class="row">
    <div class="col">
      <h5>
        Added Emojis
      </h5>
      <div>
        <button @click="addItem()">
          addItem()
        </button>
        <button @click="sortItems()">
          sortItems()
        </button>
      </div>
      <ul v-auto-animate="{ duration: 200, easing: 'ease-in-out' }">
        <li
          v-for="item in items"
          :key="`items_${item.id}`"
          @click="removeItem(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="col">
      <h5>
        Removed Emojis
      </h5>
      <div>
        <button @click="sortRemovedItems()">
          sortRemovedItems()
        </button>
      </div>
      <ul v-auto-animate="{ duration: 200, easing: 'ease-in-out' }">
        <li
          v-for="item in removedItems"
          :key="`removed_items_${item.id}`"
          @click="restoreItem(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>

  <div v-auto-animate="{ duration: 400, easing: 'ease-in-out' }">
    <div
      v-if="visible"
      class="alert"
    >
      Toggleable content
    </div>
    <button
      type="button"
      @click="visible = !visible"
    >
      {{ visible ? 'Hide' : 'Show' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  .col {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.8rem;
  }

  h5 {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;

    li {
      padding: 1rem;
      border: 1px solid #F00;
      list-style: none;
    }
  }
}

.alert {
  margin: 1rem 0;
  padding: 0.4rem 1rem;
  box-shadow: 0 0 10px #0003;
  border-radius: 0.8rem;
  // 不可以加這個，不然進退場時的動畫會壞掉
  // transform: rotate(2deg)
}
</style>