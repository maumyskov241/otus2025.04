<script setup>
import axios, * as others from 'axios'
import { onMounted, computed, ref, reactive, Suspense } from 'vue'
import ProductItem from './ProductItem.vue'
import ProductDetailView from './ProductDetailView.vue'
import BasketButtonMain from './BasketButtonMain.vue'
import ProductCreate from './ProductCreate.vue'
const products = JSON.parse(localStorage.getItem('products')) || await fetch('https://fakestoreapi.com/products').then((r) =>  r.json().then((actualData) => (actualData)))
const data = reactive({products: products, search: ''});
const basket = reactive({})
const refreshDelay = ref(1000)
const refreshIntervalId = ref(0)
const refreshRefreshingIntervalId = ref(0)
let autoincrement = ref(999)

const filteredList = computed(() => {
  return data.products.filter(function (elem) {
    if (data.search === '') return true;
    else return elem.title.toLowerCase().indexOf(data.search.toLowerCase()) > -1 || (elem.price + '').indexOf(data.search) > -1;
  })
})

const props = defineProps({
  id: String,
})

const getProductById = computed(() => {
  return data.products.filter(function (elem, i) {
    if (elem.id == props.id) return true;
    return false
  })
})

const carousel = function (router, route) {
  clearInterval(refreshRefreshingIntervalId.value);
  let targetId = route.params.id;
  let step = function () {
    let i = 0;
    let nextElement = filteredList.value.find(elem => elem.id > targetId && ++i == 1)
    if (!nextElement && filteredList.value[0] !== undefined) {
      nextElement = filteredList.value[0];
    }
    router.push('/product/' + nextElement.id);
    targetId = nextElement.id;
  }

  let letsParty = function () {
    refreshDelay.value = refreshDelay.value / 2;
    clearInterval(refreshIntervalId.value);
    refreshIntervalId.value = window.setInterval(function () { step() }, refreshDelay.value);
  }

  step();
  refreshRefreshingIntervalId.value = window.setInterval(function () { letsParty() }, 3000);
}

const stopCarousel = function () {
  clearInterval(refreshIntervalId.value);
  clearInterval(refreshRefreshingIntervalId.value);
  refreshDelay.value = 1000;
}

const goToIndexPage = function (router) {
  stopCarousel();
  router.push('/products')
}

const addToBasket = function (item) {
  if (basket.value === undefined) {
    basket.value = {};
  }

  if (basket.value[item.id] === undefined) {
    basket.value[item.id] = { quantity: 1, product: item };
  } else {
    basket.value[item.id].quantity++;
  }
  localStorage.setItem('basket', JSON.stringify(basket.value))
}

const createProduct = function (values) {
  values['rating'] = { rate: 0, count: 0 }
  values['id'] = autoincrement.value++;

  data.products.push(values);
  localStorage.setItem('products', JSON.stringify(data.products))
}

onMounted(() => {
  basket.value = JSON.parse(localStorage.getItem('basket')) ?? {}

})

</script>
<template>
  <div class="container px-4 text-center">
    <div class="row gx-5">
      <div class="col">
        <div class="p-3">
          <h3>Каталог товаров</h3>
        </div>
      </div>
      <div class="col">
        <div class="p-3">
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="data.search" placeholder="Поиск"
              aria-label="Имя пользователя получателя" aria-describedby="basic-addon2">
            <span class="input-group-text"
              v-on="$route.params.id ? { click: () => goToIndexPage($router), mouseover: () => carousel($router, $route), mouseout: () => stopCarousel() } : {}"
              :class="$route.params.id ? 'btn btn-outline-primary' : ''" id="basic-addon2">{{ filteredList.length }} шт.
              {{ $route.params.id ? refreshDelay + ' ' + refreshIntervalId + ' >>>' : '' }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div v-if="basket.value !== undefined && Object.keys(basket.value).length" class="p-3">
          <BasketButtonMain @click="$router.push('/basket')"> &nbsp;{{ Object.keys(basket.value).length }} шт.
          </BasketButtonMain>
        </div>
      </div>
    </div>
  </div>
 
  <div v-if="$route.name === 'products'" class="row row-cols-1 row-cols-md-3 mb-3 text-center">
    <ProductItem @add-to-basket="addToBasket" :item="item" v-for="item in filteredList" :key="item.id"></ProductItem>
  </div>
  <ProductDetailView @add-to-basket="addToBasket" v-else-if="$route.name === 'product' && getProductById.length > 0"
    :item="getProductById[0]"></ProductDetailView>
  <ProductCreate @create-product="createProduct" v-else-if="$route.name === 'productCreate'"></ProductCreate>


</template>

<style>
.card:hover {
  -webkit-box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
  box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3) !important;
  -webkit-transition: .3s;
  transition: .3s;
}
</style>
