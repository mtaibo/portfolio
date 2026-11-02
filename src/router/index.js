import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import StoryView from '../views/StoryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/story',
    name: 'story',
    component: StoryView
  },
  {
    path: '/tpcloud',
    name: 'tpcloud',
    component: ProjectDetail,
    props: { projectId: 'tpcloud' }
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
    // Coming back from a project lands on that project, along the home page's one long take.
    const level = history.state?.journeyLevel
    const track = document.querySelector('.journey .track')
    if (to.name === 'home' && level !== undefined && track) {
      return { top: ((track.offsetHeight - innerHeight) * level) / 7 }
    }
    return { top: 0 }
  }
})

export default router
