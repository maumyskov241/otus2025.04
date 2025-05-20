<script setup>

 defineProps(["item"])

</script>
<template>
<div id="current-item">    
    <h2>{{ item.id }} {{ item.title }}</h2>
    <p>{{ item.description }}</p>
    <p>{{ item.price }}</p>
    <p>{{ item.category }}</p>
    <p>{{ item.rating.rate }}</p>
    <p>{{ item.rating.count }}</p>
</div>
</template>
<style scoped>
#current-item {
    border: 1px solid red;
    position: fixed;
    top:0;
    right:0;
    width:350px;
    background-color:aquamarine
}
</style>
