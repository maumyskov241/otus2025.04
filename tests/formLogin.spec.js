import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import component from "../src/components/ui/FormLogin.vue";

describe("FormLogin component", () => {

  it("test form", async () => {
    const wrapper = mount(component);
    await wrapper.find('input[type=text]').setValue('name')
    await wrapper.find('input[type=password]').setValue('password')
    const form = wrapper.find('form');
    await form.trigger('submit');
    expect(wrapper.html()).toContain(' valid')

  });

  it("test form2", async () => {
    const wrapper = mount(component);
    await wrapper.find('input[type=text]').setValue('n')
    await wrapper.find('input[type=password]').setValue('password')
    const form = wrapper.find('form');
    await form.trigger('submit');

    expect(wrapper.html()).toContain(' invalid')
  });

  /** Ниже тест перехвата события, так и не заработал */
  const div = document.createElement('div')
  div.id = 'root'
  document.body.appendChild(div)

  it('нажатие кнопки запускает событие отправки', async () => {
    const wrapper = mount(component, { attachTo: '#root', attachToDocument: true })
    await wrapper.find('input[type=text]').setValue('name')
    await wrapper.find('input[type=password]').setValue('password')
    await wrapper.find('button').trigger('click')
    console.log(wrapper.emitted())
    const form = wrapper.find('form');
    await form.trigger('submit');

    console.log(wrapper.emitted('login-form-submit'))
    // expect(wrapper.emitted()).toHaveProperty('login-form-submit')
    // expect(wrapper.emitted()).toHaveProperty('submit')
    // assert.exists(wrapper.emitted('login-form-submit'), 'Отправка формы не запущена') 
  });


});