<script setup>

 defineProps(["item"])

 const emit = defineEmits()

</script>
<template>
<div> 
    <h2>{{ item.id }} {{ item.title }}</h2>
    <p>{{ item.price }}</p>
    <p>{{ item.category }}</p>
    <p>{{ item.rating.rate }}</p>
    <p>{{ item.rating.count }}</p>
    <button @click="$emit('show-more')">Подробнее</button>
</div>
</template>
<style scoped>

</style>
