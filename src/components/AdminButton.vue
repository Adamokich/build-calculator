<script setup lang="ts"></script>

<template>
  <RouterLink to="#" class="admin-button">Войти как администратор</RouterLink>
</template>

<style scoped lang="scss">
@import '../assets/styles/helpers/media';

.admin-button {
  text-decoration: none;
  padding: 12px 21px;
  background-color: var(--color-accent);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-light);
  transition: opacity 0.1s ease;

  @include hover {
    opacity: 0.6;
  }
}
</style>
