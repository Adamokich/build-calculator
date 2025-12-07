import { defineStore } from 'pinia';
import { max } from '@vee-validate/rules';
import { ref } from 'vue';
import { API_ROUTES, baseURL, client } from '@/api/api';
import type { AuthForm } from '@/interfaces/auth.interface';
import { router } from '@/router';

const ADMIN_KEY = 'admin';

export const useAuthStore = defineStore('auth', () => {
  const isAdmin = ref<boolean>(!!localStorage.getItem(ADMIN_KEY));

  const validators = {
    maxLength: (values: unknown) =>
      !max(values, { length: 20 }) ? 'Максимальная длина 20 символов!' : true,
  };

  function setAuthStatus(status: boolean): void {
    isAdmin.value = status;

    if (status) {
      localStorage.setItem(ADMIN_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_KEY);
    }
  }

  async function formSubmit(values: unknown): Promise<boolean> {
    const { data } = await client().get<AuthForm>(baseURL + API_ROUTES.admin);
    const formValues = values as AuthForm;

    if (formValues.login === data.login && formValues.password === data.password) {
      setAuthStatus(true);
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    setAuthStatus(false);
    router.push({ name: 'main' });
  }

  return { validators, formSubmit, logout, isAdmin };
});
