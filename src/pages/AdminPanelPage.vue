<script setup lang="ts">
import MainTitle from '@/components/MainTitle.vue';
import { useOperationsStore } from '@/stores/operations.store';
import { onMounted } from 'vue';
import CalculatorInput from '@/components/CalculatorInput.vue';
import NotesList from '@/components/NotesList.vue';
import AdminButton from '@/components/AdminButton.vue';
import { useAuthStore } from '@/stores/auth.store';

const operationsStore = useOperationsStore();
const authStore = useAuthStore();

onMounted(() => operationsStore.getOperations());
</script>

<template>
  <div class="admin-panel">
    <MainTitle />
    <div class="admin-panel__wrapper container">
      <div class="admin-panel__options">
        <h2 class="admin-panel__options-title">Установите средний ценник каждой работы:</h2>
        <ul class="admin-panel__options-list">
          <li
            v-for="operation in operationsStore.operations"
            :key="operation.id"
            class="admin-panel__options-item"
          >
            <CalculatorInput
              class="admin-panel__options-input"
              :placeholder="operation.count"
              :label="operation.name"
              :unit="operation.unit"
              :font-size="14"
              :is-admin-panel="true"
              @keyup.enter="operationsStore.updateOperations(operation.value, operation.id)"
              @focusout="operationsStore.updateOperations(operation.value, operation.id)"
              v-model="operation.value"
              exponent="2"
            />
          </li>
        </ul>
      </div>
      <div class="admin-panel__bottom">
        <NotesList note="notesAdminPanel" />
        <AdminButton class="admin-panel__bottom-button" @click="authStore.logout"
          >Выйти</AdminButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-direction: column;
  gap: 102px;
  font-size: 16px;

  &__wrapper {
    width: 100%;
    max-width: 1240px;
    display: flex;
    flex-direction: column;
    gap: 70px;
    padding: 50px;
    margin-inline: auto;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
    background: linear-gradient(
      180deg,
      rgba(167.1, 167.1, 172.13, 0.13),
      rgba(29, 29, 53, 0.9) 100%
    );
  }

  &__options {
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 50px;

    &-title {
      border-bottom: 2px solid var(--color-light);
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(2, 452px);
      column-gap: 170px;
      row-gap: 18px;
    }
  }

  &__bottom {
    display: flex;
    align-items: end;
    justify-content: space-between;

    &-button {
      padding: 12px 65px;
    }
  }
}
</style>
