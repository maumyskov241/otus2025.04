<script setup>

 defineProps(["item"])

 const emit = defineEmits()

</script>
<template>
<div class="product-item"> 
    <div class="wrap">
    <h2>{{ item.id }} {{ item.title }}</h2>
    <p class="product-price">{{ item.price }} руб</p>
    <p class="product-category">{{ item.category }}</p>
    <p class="product-rating-rate">{{ item.rating.rate }}</p>
    <p class="product-rating-count">{{ item.rating.count }}</p>
    <button @click="$emit('show-more', item)">Подробнее</button>
    </div>
</div>
</template>
<style scoped>

</style>
