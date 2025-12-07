<script setup lang="ts"></script>

<template>
  <RouterLink to="/auth" class="admin-button">Войти как администратор</RouterLink>
</template>

<style scoped lang="scss">
.admin-button {
  text-decoration: none;
  padding: 12px 21px;
  background-color: var(--color-accent);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-light);
  transition: opacity 0.1s ease;
}
</style>
