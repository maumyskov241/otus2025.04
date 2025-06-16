import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

/**
export const useProductStore = defineStore('data', () =>  {
    state: () => ({
        products: []
    }),
    getters: {
        productCount(state) {
            return state.products.length
        },
        productsCheaperThan(state) {
            return (price) => (
                state.products.filter(product =>
                    product.price < price
                )
            )
        }
    },
    actions: {
        addProduct(product) {
            this.products.push(product)
        }
    }
}) 
const wait = (time = 1000) =>
    new Promise((resolve) => setTimeout(resolve, time));

export const useCounterStore = defineStore('counter', {
    state: () => ({
        options: {
            a: 0,
            b: 0,
            c: 0,
        },
    }),
    actions: {
        increment(option) {
            this.options[option]++;
        },

        async delayedIncrement(option){
        await wait();
        this.options[option]++;
    }
    },
    getters: {
        totalClicks() {
            return Object.values(this.options).reduce((total, current) => {
                return total + current;
            }, 0);
        },
    },
});*/

export const useProductsStore = defineStore('products', {
    state: () => ({
        data: ref(JSON.parse(localStorage.getItem('products')) || []),
    }),
    actions: {
        async init () {
            this.data = await fetch('https://fakestoreapi.com/products').then((r) =>  r.json().then((actualData) => (actualData)));
            localStorage.setItem('products', JSON.stringify(this.data))
        }, 
        new(item) {
            this.data.push(item);
            localStorage.setItem('products', JSON.stringify(this.data))
        },
    },
    getters: {
        total() {
            let data = this.data === undefined ? [] : this.data
            console.log(data);
            return data.length ;
        },
    },
});