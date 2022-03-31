<template>
  <div class="head tag">
    <Html>
      <Head>
        <Title>{{ dynamic }} title</Title>
        <Meta name="description" :content="`My page's ${dynamic} description`" />
        <!-- <Style type="text/css" :children="styleString" /> -->
      </Head>
    </Html>

    <textarea cols="100" rows="10">
      <Html>
        <Head>
          <Title>{{ dynamic }} title</Title>
          <Meta name="description" :content="`My page's ${dynamic} description`" />
          <!-- <Style type="text/css" :children="styleString" /> -->
        </Head>
      </Html>
    </textarea>

    <div>
      用Html標籤的優先度會優於使用useMeta() hook
    </div>
  </div>
</template>

<script setup>
const dynamic = 'dynamic常數在setup中'
const styleString = 'body { background-color: lightgray; }' 

// or use useMeta() hook, 但有使用上面的Html tag時會覆蓋掉useMeta設定的head標籤
useMeta({
  title: `useMeta ${dynamic} title`,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'description', content: `My page's ${dynamic} description` }
  ]
})
</script>
