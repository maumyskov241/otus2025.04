<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const href = ref('https://vuejs.org/guide/quick-start.html#local')
const target = ref('_blank')
const count2 = ref(9000)
const color = ref('green')
const func = (x) => {alert(x)}
const func2 = () => 'orange'

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    
    <button v-if="count % 2 == 0" type="button" @mouseover="count2--;">count : {{ count2 }}</button>
    <button v-else @mouseover="func('test')" type="button">count : 0000</button>
    <button type="button" :class="color" @click="count++">count is {{ count }}</button>
    <button v-show="count % 5 == 0" type="button" v-on:click="count2--;count++;count2--;count++;"> count + count2</button>
  </div>
  <div :class="func2()">1</div>

  <p><a :href="href" :target="target">{{target}}</a></p>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.green {
  background-color: green;
}
.orange {
  background-color: orange;
}
</style>
