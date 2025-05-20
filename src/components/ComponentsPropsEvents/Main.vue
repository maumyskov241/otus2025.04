<script setup>
import "../../assets/components-props-events.css";
import axios, * as others from 'axios'
import { onMounted, ref, reactive} from 'vue'
import  ProductsItem  from './ProductsItem.vue'
import  DetailView  from './DetailView.vue'

const goods = ref([])
const url = 'https://fakestoreapi.com/products'
const currentItem = reactive({})

onMounted(() => {
    axios
      .get(url)
      .then((response) => {
        goods.value = response.data
        if (response.data.length > 0) currentItem.value = response.data[0]
      })
  })

function showMore(item) {
  currentItem.value = item;
}

defineProps({
  msg: String,
})

</script>

<template>
<h1>{{ msg }}</h1>
  <products-item @show-more="showMore(item)" :item="item" v-for="item in goods" :key="item.id"></products-item>
  <detail-view v-if="Object.keys(currentItem).length > 0" :item="currentItem.value"></detail-view>
</template>

<style>
button {
    background-color: aqua;
    padding: 10px;
}
</style>
