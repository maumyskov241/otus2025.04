<script setup>
import "../../assets/components-props-events.css";
import axios, * as others from 'axios'
import { onMounted, computed, ref, reactive} from 'vue'
import  ProductsItem  from './Item.vue'
import  DetailView  from './DetailView.vue'
import  ProductAdd  from './Add.vue'
import  CheckoutForm  from './Checkout.vue'

const data = reactive({produscts : [], search : ''})
const url = 'https://fakestoreapi.com/products'
const currentItem = reactive({})

const filteredList = computed(() => {
  return data.produscts.filter(function (elem) {
    if(data.search==='') return true;
    else return elem.title.toLowerCase().indexOf(data.search.toLowerCase()) > -1 || (elem.price + '').indexOf(data.search) > -1;
  })
})

onMounted(() => {
    axios
      .get(url)
      .then((response) => {
        data.produscts = response.data
        if (response.data.length > 0) currentItem.value = response.data[0]
      })
  })
 
let autoincrement = ref(999)

const showMore = function (item) {
  currentItem.value = item;
}
const checkout = function (values) {
  axios.post('https://httpbin.org/delay/1', values)
    .then((response) => {
        alert('Status ' + response.status);
        window.setTimeout(function(){
          window.location.href = '';
        },2000)
      })
    .catch(error => {
        console.error('There was an error!', error);
    });
}
const addProduct = function (values) {
  values['rating'] = {rate:0,count:0}
  values['id'] = autoincrement.value++;
  values['description'] = 'some text';

  data.produscts.push(values);
}

defineProps({
  msg: String,
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="data.search" type="text" placeholder="Поиск"/>
  <products-item @show-more="showMore" :item="item" v-for="item in filteredList" :key="item.id"></products-item>
  <detail-view v-if="Object.keys(currentItem).length > 0" :item="currentItem.value"></detail-view>
  <product-add @add-product="addProduct" msg="Добавить товар"></product-add>
  <checkout-form @checkout="checkout" msg="Форма заказа"></checkout-form>
</template>

<style>
h1 {
  font-size: 24px;
    font-weight: 400;
    margin-bottom: 10px;
    position: relative;
}
input[type=text], input[type=date], input[type=email], input[type=button],  input[type=password], select, textarea {
  display: block;
    height: 34px;
    padding: 6px 12px;
    font-size: 24px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 20px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    margin:5px;
}

textarea {
  height: 80px;

}

input:focus {
  border-color: #2b542c;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
}

button {
    background-color: #ff890f;
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color:#fff;
}
.product-item {
  display:inline-block;
  width: 200px;
  margin: 5px;
  padding:5px;
  background-color: antiquewhite;
  box-shadow: 2px 3px 10px -5px rgba(0, 0, 0, 0.45);
  border-radius: 5px;
}
.product-item .wrap .product-category{
  background-color: rgb(217, 230, 230);
}
.product-item .wrap h2{
  background-color: rgb(217, 230, 230);
  min-height: 100px;
  font-size: 12px;
}
.product-item .wrap {
    display: block;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
}

.product-item .wrap:hover {
      padding: 20px;
    margin: -21px;
    border: 1px solid #DADADA;
    z-index: 10;
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}
</style>
