import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Test1 from '../views/Test1.vue'
import Test2 from '../views/Test2.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true
  },{
    path: '/home',
    name: '导航一',
    component: Home,
    children:[
      {
        path: '/test1',
        name: '选项一',
        component: Test1
      },{
        path: '/test2',
        name: '选项二',
        component: Test2
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
