<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
    basket: Object,
})

const basket = reactive(props.basket)

const productRemove = function (item) {
    delete basket[item.product.id];
};

const calculateTotal = computed(() => {
    let round = (x) => (Math.round(x * 100) / 100)
    let sum = 0;

    Object.keys(basket).forEach(function (key) {
        sum += basket[key].quantity * basket[key].product.price;
    });

    let delivery = sum < 1000 ? 500 : 0;

    return { 'price': round(sum), 'delivery': delivery, 'products': Object.keys(basket).length, 'finalPrice': round(sum + delivery) };
});

const clearBasket = () => Object.keys(basket).forEach((key) => delete basket[key]);
</script>
<template>
    <div class="card card-registration card-registration-2" style="border-radius: 15px">
        <div class="card-body p-0">
            <div class="row g-0">
                <div class="col-lg-8">
                    <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <h1 class="fw-bold mb-0">Корзина товаров</h1>
                            <h6 class="mb-0 text-muted">
                                {{ calculateTotal.products }} товаров
                            </h6>
                        </div>
                        <slot v-for="item in basket" :item="item" :productRemove="productRemove" :key="item.product.id">
                        </slot>
                        <div class="pt-5">
                            <h6 class="mb-0">
                                <button type="button" class="btn btn-primary" @click="$router.push('/')">
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
                                {{ calculateTotal.products }} товаров
                            </h5>
                            <h5>₽ {{ calculateTotal.price }}</h5>
                        </div>
                        <div class="d-flex justify-content-between mb-4">
                            <h5 class="text-uppercase mb-3">Доставка</h5>
                            <h5>₽ {{ calculateTotal.delivery }}</h5>
                        </div>
                        <div class="mb-4 pb-2">
                            <select data-mdb-select-init>
                                <option value="1">По городу</option>
                            </select>
                        </div>

                        <h5 class="text-uppercase mb-3">Промокод</h5>

                        <div class="mb-5">
                            <div data-mdb-input-init class="form-outline">
                                <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                                <label class="form-label" for="form3Examplea2">Введите код</label>
                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-5">
                            <h5 class="text-uppercase">Итоговая стоимость</h5>
                            <h5>₽ {{ calculateTotal.finalPrice }}</h5>
                        </div>

                        <button type="button" @click="clearBasket" data-mdb-button-init data-mdb-ripple-init
                            class="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark">
                            Очистить корзину
                        </button>

                        <button @click="$router.push('/checkout')" type="button" data-mdb-button-init
                            data-mdb-ripple-init class="btn btn-warning btn-block btn-lg" data-mdb-ripple-color="dark"
                            style="float: right">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.card:hover {
    -webkit-box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
    box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3) !important;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}
</style>
