<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
</script>

<template>
  <button @click="authStore.logout">Выйти</button>
</template>

<style scoped lang="scss"></style>
