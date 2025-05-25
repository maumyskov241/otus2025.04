<script setup ts>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, min, length, email, regex, max, integer, is} from "@vee-validate/rules"
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
defineRule('integer', integer);
defineRule('is', is);

const emit = defineEmits()
const fio = ref('')
const mail = ref('')
const birthday = ref('')
const country = ref('')
const adress = ref('')
const agreement = ref('')
const card = ref({main : ''}, {second : '' })

function onSubmit(values) {
  emit('checkout', values)
}

defineProps({
  msg: String,
})

const countries = [{id: 0, name: "Россия"}, {id: 1, name: "Беларусь"}, {id: 2, name: "Казахстан"}, {id: 3, name: "Китай"}]
const show = ref(false)
</script>

<template>
  <div id="checkout">
    <input type="button" class="add-btn" @click="show = !show" :value="msg"/>
    <Form v-show="show"  @submit="onSubmit" v-slot="{ values }">

      <div>* ФИО <b>{{ fio }}</b></div>
      <Field name="fio" type="text" v-model.trim="fio" placeholder="ФИО" rules="required|min:4|max:255" />
      <ErrorMessage name="fio" />

      <div>* Почта <b>{{ mail }}</b></div>
      <Field name="mail" type="email" v-model.trim.lazy="mail" placeholder="Почта" rules="required|email|max:255" />
      <ErrorMessage name="mail" />
<!--
      <div>* ФИО <b>{{ fio }}</b></div>
      <Field name="fio" type="text" v-model="fio" placeholder="Заголовок" rules="required|min:4|max:255" />
      <ErrorMessage name="fio" />-->

      <div>* Дата рождения <b>{{ birthday }}</b></div>
      <Field name="birthday" type="date" v-model="birthday" placeholder="Дата рождения" rules="required" />
      <ErrorMessage name="birthday" />

      <div>* Страна <b>{{ country }}</b></div>
      <Field name="country" as="select" v-model="country" rules="required">
        <option></option>
        <option v-for="item in countries" :key="item.id" :value="item.name">{{ item.name }}</option>
      </Field>
      <ErrorMessage name="country" />

      <div>* Адрес <b>{{ 200 - adress.length }}</b></div>
      <Field name="adress" as="textarea"  maxlength="200" v-model="adress" rows="5" cols="22" :rules="{required: true, min: 20}"></Field>
      <ErrorMessage name="adress" />

      <div>* Карта <b>{{ card.main }}</b></div>
      <Field name="card.main" type="text"  style="width:220px;float:left" v-model.trim="card.main" maxlength="16" placeholder="xxxx xxxx xxxx xxxx" rules="required|integer|min:16|max:16" />
      <Field name="card.second" style="width:30px" type="password" maxlength="3" v-model="card.second" placeholder="***" rules="required|integer|min:3|max:3" />
      <ErrorMessage name="card.main" />
      <ErrorMessage name="card.second" />

      <Field name="agreement" type="checkbox" v-model="agreement" value="1" rules="is:1"></Field> соглашаюсь на обработку персональных данных.
      <ErrorMessage name="agreement">
        <span role="alert">Необходимо дать согласие</span>
      </ErrorMessage>

      <button>Submit</button>

      <p>Values</p>
      <pre>{{ values }}</pre>
    </Form>
  </div>
</template>
<style scoped>
#checkout {
    position: fixed;
    bottom:100px;
    right:0;
    width:350px;
    background-color:rgb(245, 236, 222);
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
    color:red;
    display:block;
}
</style>