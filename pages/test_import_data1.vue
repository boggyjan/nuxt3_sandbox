<template>
  <div>
    <p>對import後的資料做編輯，會影響到其他也有import該資料的地方。即使不是同時import，但該資料在import後，應該是會在某個scope被一直keep住，當有其他頁面或comp也import時，就能直接丟給他使用。因此一旦修改過，後續有import的地方，收到的也都會是這個修改過的資料。</p>
    <p>下面的範例是import data from '@/data/data.json'的資料，然後在data()裡面新增了c資料。當我們切換到一樣有import該資料的test_import_data2頁面，也會看到c資料。</p>
    <p><strong>因為layout有用keep-alive，所以要先進入到1再進去2，不然會看到快取的頁面。</strong></p>

    {{ data }}

    <hr>

    <nuxt-link to="test_import_data2">
      Go to test_import_data2
    </nuxt-link>
  </div>
</template>

<script setup>
import data from '@/data/data.json'
data.c = 'ccccccccc gogogo!'
</script>
