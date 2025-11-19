<script setup lang="ts">
import CalculatorPanel from '@/components/CalculatorPanel.vue';
import MainTitle from '@/components/MainTitle.vue';
import TotalPricePanel from '@/components/TotalPricePanel.vue';
</script>

<template>
  <div class="main-page">
    <MainTitle />

    <div class="main-page__calculator">
      <div class="container main-page__calculator-wrapper">
        <CalculatorPanel />
      </div>
      <TotalPricePanel />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 52px;

  &__calculator {
    width: 100%;
    display: grid;
    grid-template-columns: 1000px 450px;
    align-items: start;
    justify-content: space-between;
    gap: 50px;

    &-wrapper {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 50px;
    }
  }
}
</style>
