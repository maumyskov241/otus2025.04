import { createWebHistory, createRouter } from 'vue-router'

import IndexPage from './components/routing/IndexPage.vue'
import ProductPage from './components/routing/ProductPage.vue'
import BasketPage from './components/routing/BasketPage.vue'
import NotFoundPage from './components/routing/NotFoundPage.vue'
import CheckoutPage from './components/routing/CheckoutPage.vue'
import LoginPage from './components/routing/LoginPage.vue'

const routes = [
  { path: '/', name: 'home', component: IndexPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/basket', name: 'basket', component: BasketPage },
  { path: '/checkout', name: 'checkout', component: CheckoutPage },
  { path: '/products', name: 'products', component: ProductPage },
  { path: '/product/:id', name: 'product', component: ProductPage, props: true },
  { path: '/product/create', name: 'productCreate', component: ProductPage },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (
    !localStorage.getItem("auth") &&

    // ❗️ Avoid an infinite redirect
    to.name === 'productCreate'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }

  if (from.name == 'basket' && to.name != 'checkout') {
    const answer = window.confirm('Вы действительно хотите покинуть корзину? Товары сами себя не купят ;(((')
    if (!answer) return false
  }


})

export default router