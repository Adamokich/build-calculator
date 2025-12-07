<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate';
import MainTitle from '@/components/MainTitle.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const { handleSubmit, setErrors, errors } = useForm();
const passwordErrorClass = computed(() => !!errors.value['password']);
const loginErrorClass = computed(() => !!errors.value['login']);
const anyErrorClass = computed(() => !!errors.value['']);

const onSubmit = handleSubmit(async (formValues: unknown) => {
  const succes = await authStore.formSubmit(formValues);

  if (!succes) {
    setErrors({
      '': 'Неверный логин или пароль',
    });
  } else {
    router.push({ name: 'admin' });
  }
});
</script>

<template>
  <div class="auth">
    <MainTitle />

    <div class="auth__wrapper container">
      <h2 class="auth__title">Авторизация администратора</h2>
      <form class="auth__form" @submit.prevent="onSubmit" autocomplete="off">
        <div class="auth__form-fields">
          <div class="auth__login">
            <label for="login">Логин</label>
            <Field
              class="auth__form-field"
              :class="{ 'error-border': loginErrorClass || anyErrorClass }"
              name="login"
              id="login"
              type="text"
              :rules="authStore.validators.maxLength"
            />
            <ErrorMessage name="login" class="error-message" />
          </div>
          <div class="auth__password">
            <label for="password">Пароль</label>
            <Field
              class="auth__form-field"
              :class="{ 'error-border': passwordErrorClass || anyErrorClass }"
              name="password"
              id="password"
              type="password"
              :rules="authStore.validators.maxLength"
            />
            <ErrorMessage name="password" class="error-message" />
          </div>
        </div>
        <ErrorMessage class="error-message" name="" />
        <button class="auth__form-button">Войти</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  gap: 240px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    margin-inline: auto;
  }

  &__title {
    font-size: 40px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 61px 63px 65px 63px;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
    background: linear-gradient(
      180deg,
      rgba(167.1, 167.1, 172.13, 0.13),
      rgba(29, 29, 53, 0.9) 100%
    );

    &-fields {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    &-field {
      font-size: 24px;
      padding: 8px 20px;
      border-radius: 4px;
    }

    &-button {
      padding: 8px 58px;
      font-size: 24px;
      border-radius: 4px;
    }
  }

  &__login,
  &__password {
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: 24px;
    font-weight: 700;
    align-items: center;
  }
}

.error-message {
  font-size: 18px;
  font-weight: 400;
  color: var(--color-error);
}

.error-border {
  border: 1px solid var(--color-error);
}
</style>
