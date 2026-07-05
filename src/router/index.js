import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tphome',
    name: 'tphome',
    component: ProjectDetail,
    props: { projectId: 'tphome' }
  },
  {
    path: '/hackudc26',
    name: 'hackudc26',
    component: ProjectDetail,
    props: { projectId: 'hackudc26' }
  },
  {
    path: '/dotfiles',
    name: 'dotfiles',
    component: ProjectDetail,
    props: { projectId: 'dotfiles' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
