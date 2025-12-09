import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth.store';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./pages/MainPage.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./pages/AuthPage.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./pages/AdminPanelPage.vue'),
    },
  ],
});

const publicPages = ['main', 'auth'];

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const isPrivatePages = !publicPages.includes(to.name as string);

  if (!authStore.isAdmin && isPrivatePages) {
    return { name: 'main' };
  }

  if (authStore.isAdmin && to.name === 'auth') {
    return { name: 'admin' };
  }
});
