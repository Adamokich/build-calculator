<script setup lang="ts">
import { computed, ref } from 'vue';
import SquareRoom from './SquareRoom.vue';
import AdminButton from './AdminButton.vue';
import NeccesaryWork from './NeccesaryWork.vue';

const isActive = ref<boolean>(true);

const currentTabContent = computed(() => {
  return isActive.value ? SquareRoom : NeccesaryWork;
});
</script>

<template>
  <div class="calculator-panel">
    <div class="calculator-panel__wrapper">
      <div class="calculator-panel__tab-buttons">
        <button
          :class="`calculator-panel__tab-button ${isActive ? 'active' : ''}`"
          @click="isActive = true"
        >
          Площадь помещения
        </button>
        <button
          :class="`calculator-panel__tab-button ${!isActive ? 'active' : ''}`"
          @click="isActive = false"
        >
          Необходимые работы
        </button>
      </div>
      <div class="calculator-panel__tab-content">
        <KeepAlive>
          <component :is="currentTabContent"></component>
        </KeepAlive>
      </div>
    </div>
    <AdminButton class="calculator-panel__button">Войти как администратор</AdminButton>
  </div>
</template>

<style scoped lang="scss">
.calculator-panel {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 50px;

  &__tab-content {
    padding: 50px;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
    background: linear-gradient(
      180deg,
      rgba(167.1046905517578, 167.1046905517578, 172.125, 0.13),
      rgba(29, 29, 53, 0.9) 100%
    );
  }

  &__tab-buttons {
    display: flex;
    align-items: center;
  }

  &__tab-button {
    position: relative;
    font-weight: 700;
    color: var(--color-light);
    border: none;
    background-color: rgba(6, 6, 6, 0.35);
    padding: 12px 21px 16px 21px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  &__button {
    margin-bottom: 20px;
  }
}

.active {
  border-bottom: 2px solid var(--color-accent);
}
</style>
