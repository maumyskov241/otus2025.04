<script setup>
import { watch, reactive } from "vue";
import BasketItem from "../components/ui/BasketItem.vue";
import Basket from "../components/ui/Basket.vue";

const localStorageBasket = localStorage.getItem("basket");
const basket = reactive(
  JSON.parse(isJson(localStorageBasket) ? localStorageBasket : null) ?? {}
);

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

watch(basket, function (newBasket) {
  localStorage.setItem("basket", JSON.stringify(newBasket));
});
</script>

<template>
  <div class="container px-4 text-center">
    <div class="row gx-5">
      <div class="col">
        <div class="p-3">
          <h3>Корзина товаров</h3>
        </div>
      </div>
    </div>
  </div>
  <section class="h-100 h-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <Basket :basket="basket" v-slot="{item, productRemove}">
            <BasketItem :productRemove="productRemove"  :item="item"/>
          </Basket>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.card:hover {
  -webkit-box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
  box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3) !important;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
</style>
<style scoped></style>
