<script setup>
import { onMounted, computed, ref, watch, reactive } from "vue";
import BasketItem from "./BasketItem.vue";

const localStorageBasket = localStorage.getItem("basket");
let totalPrice = ref(0);
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

const productRemove = function (item) {
  delete basket[item.product.id];
};

const quantityChange = function (item, value) {
  basket[item.product.id].quantity = value;
};

const calculateTotalPrice = computed(() => {
  let sum = 0;
  Object.keys(basket).forEach(function (key) {
    sum += basket[key].quantity * basket[key].product.price;
  });
  return sum;
});

watch(basket, function (newBasket) {
  localStorage.setItem("basket", JSON.stringify(newBasket));
});
</script>

<template>
  <div class="container px-4 text-center">
    <div class="row gx-5">
      <div class="col">
        <div class="p-3"><h3>Корзина товаров</h3></div>
      </div>
    </div>
  </div>

  <section class="h-100 h-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div
            class="card card-registration card-registration-2"
            style="border-radius: 15px"
          >
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0">Корзина товаров</h1>
                      <h6 class="mb-0 text-muted">
                        {{ Object.keys(basket ? basket : {}).length }} товаров
                      </h6>
                    </div>
                    <BasketItem
                      @product-remove-from-basket="productRemove"
                      @product-quantity-change="quantityChange"
                      :item="item"
                      v-for="item in basket"
                      :key="item.product.id"
                    ></BasketItem>
                    <div class="pt-5">
                      <h6 class="mb-0">
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="$router.push('/products')"
                        >
                          Go to Каталог товаров
                        </button>
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-body-tertiary">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Итого</h3>
                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">
                        {{ basket !== null ? Object.keys(basket).length : 0 }} товаров
                      </h5>
                      <h5>₽ {{ calculateTotalPrice }}</h5>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase mb-3">Доставка</h5>
                      <h5>₽ {{ calculateTotalPrice ? 500 : 0 }}</h5>
                    </div>
                    <div class="mb-4 pb-2">
                      <select data-mdb-select-init>
                        <option value="1">По городу</option>
                      </select>
                    </div>

                    <h5 class="text-uppercase mb-3">Промокод</h5>

                    <div class="mb-5">
                      <div data-mdb-input-init class="form-outline">
                        <input
                          type="text"
                          id="form3Examplea2"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Examplea2">Введите код</label>
                      </div>
                    </div>

                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Итоговая стоимость</h5>
                      <h5>₽ {{ calculateTotalPrice ? calculateTotalPrice + 500 : 0 }}</h5>
                    </div>

                    <button
                      type="button"
                      @click="Object.keys(basket).forEach((key) => delete basket[key])"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-dark btn-block btn-lg"
                      data-mdb-ripple-color="dark"
                    >
                      Очистить корзину
                    </button>

                    <button
                      @click="$router.push('/checkout')"
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-warning btn-block btn-lg"
                      data-mdb-ripple-color="dark"
                      style="float: right"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
