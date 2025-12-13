<script setup lang="ts">
import CalculatorPanel from '@/components/CalculatorPanel.vue';
import MainTitle from '@/components/MainTitle.vue';
import TotalPricePanel from '@/components/TotalPricePanel.vue';
</script>

<template>
  <div class="main-page">
    <MainTitle class="main-page__title" />

    <div class="main-page__calculator">
      <div class="container main-page__calculator-wrapper">
        <CalculatorPanel />
      </div>
      <TotalPricePanel />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media' as *;

.main-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 52px;

  @include mobile {
    gap: 20px;
  }

  &__title {
    @include tablet-l {
      font-size: 42px;
    }

    @include tablet {
      font-size: 29px;
    }

    @include mobile {
      font-size: 20px;
    }
  }

  &__calculator {
    width: 100%;
    display: grid;
    grid-template-columns: 1000px 450px;
    align-items: start;
    justify-content: space-between;
    gap: 20px;

    @include desktop {
      grid-template-columns: 800px 450px;
    }

    @include laptop {
      grid-template-columns: 600px 450px;
      align-items: center;
    }

    @include tablet-l {
      display: flex;
      flex-direction: column;
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 50px;
    }
  }
}
</style>
