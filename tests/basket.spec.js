import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import component from "../src/components/ui/Basket.vue";
import BasketItem from "../src/components/ui/BasketItem.vue";

describe("BasketButton component", () => {

    const data = { "2": { "quantity": 1, "product": { "id": 2, "title": "Mens Casual Premium Slim Fit T-Shirts ", "price": 22.3, "description": "Slim-fitting stylecket.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 4.1, "count": 259 } } }, "3": { "quantity": 2, "product": { "id": 3, "title": "Mens Cotton Jacket", "price": 55.99, "description": "great outerwear jackets for Spring/Autumn/Wintas Day.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "rating": { "rate": 4.7, "count": 500 } } } }

    it('basket, удаление товара', async () => {
        const wrapper = mount(component, {
            global: {
                components: {
                    'BasketItem': BasketItem
                }
            },
            propsData: {
                basket: data
            },
            slots: {
                default: `<BasketItem :productRemove="productRemove"  :item="item"/>`
            }
        })

        expect(wrapper.html()).toContain('2 товаров')

        await wrapper.find('button[title="убрать из корзины"]').trigger('click')
        
        expect(wrapper.html()).toContain('1 товаров')

        await wrapper.find('#id3').find('.up').trigger('click');
        await wrapper.find('#id3 .up').trigger('click');
        await wrapper.find('#id3 .up').trigger('click');
        await wrapper.find('#id3 .up').trigger('click');

        expect(wrapper.find('#total-price').html()).toContain('₽ 835.94')
    })
});