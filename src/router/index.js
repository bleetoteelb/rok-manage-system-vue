import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: "osiris" }
  },
  {
    path: '/osiris-register',
    name: 'osiris-register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OsirisRegisterView.vue')
  },
  {
    path: '/osiris',
    name: 'osiris',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OsirisView.vue')
  },
  {
    path: '/user-edit',
    name: 'user-edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserEditView.vue')
  },
  {
    path: '/member-edit',
    name: 'member-edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberEditView.vue')
  },
  {
    path: '/member-violate',
    name: 'member-violate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberViolateView.vue')
  },
  {
    path: '/member-violate-edit',
    name: 'member-violate-edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberViolateEditView.vue')
  },
  {
    path: '/member-update',
    name: 'member-update',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MemberUpdateView.vue')
  },
  {
    path: '/osiris-edit',
    name: 'osiris-edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/OsirisEditView.vue')
  },
  {
    path: '/profile-pictures',
    name: 'profile-pictures',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilePictures.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
