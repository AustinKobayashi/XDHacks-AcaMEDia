import Vue from 'vue'
import Router from 'vue-router'
import Main from './Pages/frontpage.vue'
import QueryHelper from './Pages/QueryHelper.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Main
    },
    {
      path: '/QueryHelper',
      name: 'QueryHelper',
      component: QueryHelper
    }
  ]
})