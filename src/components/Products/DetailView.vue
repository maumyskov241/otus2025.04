<script setup>

 defineProps({item : Object})

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
    position: fixed;
    top:0;
    right:0;
    width:350px;
    background-color:rgb(245, 236, 222);
    border: 1px solid #DADADA;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    padding: 10px;
    min-height: 50%;
}

#current-item h2 {
    min-height: 100px;
}
</style>
