<script setup>
import './styles/style.css'
import { onMounted, computed, ref, reactive} from 'vue'
const ls = ref(localStorage.auth);
</script>

<template>
  <header> 
  <div class="container">
  <h1>Роутинг</h1>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">Главная</RouterLink>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
         <RouterLink class="nav-link" to="/products">Товары</RouterLink>
        </li>
      </ul>
    </div>
        <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
         <RouterLink class="nav-link" to="/basket">Корзина</RouterLink>
        </li>
      </ul>

      <ul class="navbar-nav">
        <li class="nav-item">
         <RouterLink class="nav-link" to="/product/create">Добавить товар</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav" v-if="ls===undefined">
        <li class="nav-item">
         <RouterLink class="nav-link" to="/login">Вход</RouterLink>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  </div>
  </header>
  <main>
      <RouterView />
 </main>
  
</template>

<style scoped>
</style>
