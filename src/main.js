import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { ApolloClients, DefaultApolloClient } from "@vue/apollo-composable"
import { apolloClient } from "./components/apollo"
import 'bootstrap/scss/bootstrap.scss'

const pinia = createPinia()



//createApp(App)

createApp({
    setup() {
        provide(ApolloClients, {
      default: apolloClient,
    })
    },
    render: () => h(App)
})
    .use(router)
    .use(pinia)
    .mount('#app')
