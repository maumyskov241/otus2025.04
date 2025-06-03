<script setup ts>
import { ref } from 'vue'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, min, length, email, regex, max } from "@vee-validate/rules"
import { localize, setLocale } from '@vee-validate/i18n'
import ru from '@vee-validate/i18n/dist/locale/ru.json'

configure({
  generateMessage: localize({
    ru
  })
});

setLocale('ru');

defineRule('required', required);
defineRule('min', min);
defineRule('length', length);
defineRule('email', email);
defineRule('regex', regex);
defineRule('max', max);

const emit = defineEmits()

function onSubmit(values) {
  emit('add-product', values)
}

const itemCategory = [{ id: 0, name: "men's clothing" }, { id: 1, name: "jewelery" }, { id: 2, name: "electronics" }, { id: 3, name: "women's clothing" }]
const show = ref(false)
</script>

<template>
  <div id="add-product">
    <input type="button" class="add-btn" @click="show = !show" :value="msg" />
    <Form v-show="show" @submit="onSubmit" v-slot="{ values }">
      <Field name="title" type="text" placeholder="Заголовок" rules="required|min:4|max:255" />
      <ErrorMessage name="title" />
      <Field name="price" type="text" placeholder="Стоимость" rules="required|max:20|regex:^([0-9]+)((\.[0-9])?)$" />
      <ErrorMessage name="price" />
      <Field name="category" as="select" rules="required">
        <option></option>
        <option v-for="item in itemCategory" :key="item.id" :value="item.name">{{ item.name }}</option>
      </Field>
      <ErrorMessage name="category" />
      <button>Submit</button>
    </Form>
  </div>
</template>
<style scoped>
#add-product {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  width: 350px;
  background-color: rgb(245, 236, 222);
  border: 1px solid #DADADA;
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  padding: 10px;
}

.add-btn {
  background-color: #ff890f;
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  color: #fff;
}

span[role=alert] {
  color: red;
  display: block;
}
</style>