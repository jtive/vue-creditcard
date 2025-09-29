import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/bootstrap-icons.css'

// Import components
import Dashboard from './components/Dashboard.vue'
import PersonsList from './components/PersonsList.vue'
import AddPerson from './components/AddPerson.vue'
import EditPerson from './components/EditPerson.vue'
import ViewPerson from './components/ViewPerson.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/persons', component: PersonsList },
  { path: '/persons/add', component: AddPerson },
  { path: '/persons/edit/:id', component: EditPerson, props: true },
  { path: '/persons/:id', component: ViewPerson, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
