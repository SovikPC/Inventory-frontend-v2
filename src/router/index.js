import { createRouter, createWebHistory } from 'vue-router'
import EquipmentListView from '@/views/equipment/EquipmentListView.vue'
import UserListView from '@/views/user/UserListView.vue'
import ReportListView from '@/views/report/ReportListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EquipmentListView
  },
  {
    path: '/users',
    name: 'user',
    component: UserListView
  },
  {
    path: '/reports',
    name: 'report',
    component: ReportListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
