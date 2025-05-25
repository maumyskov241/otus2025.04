<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';

const schema = {
  drink: (value) => {
    if (value && value.length) {
      return true;
    }

    return 'You must choose a drink';
  },

  name: (value) => {
    if (value) {
      return true;
    }

    return 'Вы должны заполнить поле';
  },

};

function onSubmit(values) {
  console.log(JSON.stringify(values, null, 2));
}

defineProps({
  msg: String,
})
</script>

<template>
  <h3>{{ msg }}</h3>
  <div id="app">
    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ values }">
      <Field name="drink" type="checkbox" value="Water" /> Water
      <Field name="drink" type="checkbox" value="Tea" /> Tea
      <Field name="drink" type="checkbox" value="Coffee" /> Coffee

      <ErrorMessage name="drink" />

      <Field name="name" type="text" value="Water" />

      <ErrorMessage name="name" />

      <Field name="email" type="email"  />

      <ErrorMessage name="email" />

      <button>Submit</button>

      <p>Values</p>
      <pre>{{ values }}</pre>
    </Form>
  </div>
</template>