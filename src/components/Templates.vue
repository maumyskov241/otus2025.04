<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const users = ref([
    {key : 1, name: 'Юрий', age: 17},
    {key : 2, name: 'Илья', age: 26},
    {key : 4, name: 'Михаил', age: 35},
    {key : 10, name: 'Наташа'},
    {key : 11, name: 'Иван', age: 27},
    {key : 21, name: 'Илона', age: 13},
    {key : 41, name: 'Никодим', age: 39},
    {key : 101, name: 'Елена'},
])


const liClass = ref('list-item')
const showList = ref(true)
const html = '<img class="checked" style="position: absolute; top: 4px; right:10px" alt="Возраст указан" title="Возраст указан" src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADoSURBVHgB3ZUxDoIwFIb/Eg9guIE7N/AO6uimN1AXXXHURY7g6CpncfcGpCeg9oENDWClUEzwT5qUB/2+lDR9wNDD9Aex8EMIbOR0jHbhcv2VxcmuIpDw6A3vHpGGLOZHmnpFESu4CvO2aupp5ba/pS7jOkEvGYBgechHL4IMvgedEPcCBb+d5Di3EJi23hBuFtC2CVKWWMApo49v1GIlIKAl3CwoS4JpPizg3wVliSWcUlx2c18Yv5wEwPOBxuB7krGbH1MLuJ6fXhUc7sKrAoYIriK7WoHV6zP/IitrdGqZaaS62X/kBWTiSxsEAMHCAAAAAElFTkSuQmCC" />';
const border = ref('rgb(108, 143, 116)')
const showMessage = (x) => {alert(x + ' лет, совершеннолетие.')}
const acceptedAge = (age) => age !== undefined && age >= 18
const notAcceptedAge = (age) => age !== undefined && age < 18
const checkAge = (age) => age === undefined || age < 18 ? 'red' : 'green'
const color = ref('black')

</script>

<template>
  <h1 :style=[{color:color}] @mouseover="color = 'red'" @mouseout="color = 'lime'">{{ msg }}</h1>
  <!-- Подскажите, почему в итоге получилось в теге h1 'style="color: lime; --7aad6f05-border: rgb(108, 143, 116);"', вроде должно быть просто 'style="color: lime;'. Что-то я тут накрутил. -->
  <button @click="showList = !showList">Список {{ showList ? '-' : '+' }}</button>
  <div class="card" v-show="showList">
    <ol>
        <li v-for="user in users" key="user.key" v-bind:class="liClass">
            <b :class="checkAge(user.age)">{{ user.name }}</b>
            <span v-show="user.age !== undefined">
                <i v-if="notAcceptedAge(user.age)">{{ user.age }} лет <i v-html="html"></i></i>
                <a v-else-if="acceptedAge(user.age)" @click="showMessage(user.age)">{{ user.age }} лет <i v-html="html"></i></a>
            </span>

            <span v-if="user.age !== undefined"></span>
            <span v-else style="padding:5px">Возраст не указан</span>
        </li>
    </ol>
  </div>
  


</template>

<style scoped>
.card .green {
  background-color: rgb(153, 247, 153);
}
.card .red {
  background-color: rgb(255, 182, 163);
}
.card ol li.list-item {
    text-align: left;
    position: relative;
}
.card ol li.list-item:hover {
    opacity:0.7;
}
.card ol li b {
    display:inline-block;
    width:200px;
    padding: 5px;
}
.card ol li span i{
    opacity: 0.5;
    padding:5px;
}
.card ol li span a{
    padding:4px;
    border: 1px solid v-bind(border);
    cursor: pointer;
}
.card ol li span a:hover {
    background-color: antiquewhite;
}
</style>
