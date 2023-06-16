import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from './views/Home.vue'
import DatasetListsView from './views/lists/DatasetLists.vue'
import DatasetView from './views/dataset/Dataset.vue'
//import DatasetDetailView from './views/lists/DatasetDetail.vue'
import DatasetConfirmView from './views/dataset/DatasetConfirm.vue'
import MypageView from './views/mypage/Mypage.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/lists',
    },
    {
      path: '/lists',
      name: 'lists',
      component: DatasetListsView
    },
    {
        path: '/dataset',
        name: 'dataset',
        component: DatasetView
    },
    //{
    //    path: '/dataset/:datasetId',
    //    name: 'datasetDetail',
    //    component: DatasetDetailView
    //},
    {
        path: '/datasetConfirm',
        name: 'datasetConfirm',
        component: DatasetConfirmView
    },
    {
        path: '/mypage',
        name: 'mypage',
        component: MypageView
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

export default router
