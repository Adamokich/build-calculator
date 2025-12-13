<script setup lang="ts"></script>

<template>
  <RouterLink to="/auth" class="admin-button"><slot /></RouterLink>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media' as *;

.admin-button {
  text-decoration: none;
  padding: 12px 21px;
  background-color: var(--color-accent);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-light);
  transition: opacity 0.2s ease;

  @include hover {
    opacity: 0.5;
  }
}
</style>
