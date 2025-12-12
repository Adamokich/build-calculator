<script setup lang="ts">
import { useCalculatorStore } from '@/stores/calculator.store';
import { onMounted } from 'vue';
import AdminButton from './AdminButton.vue';

const calculatorStore = useCalculatorStore();

onMounted(() => calculatorStore.getCurrentCurrency());
</script>

<template>
  <div class="total-price">
    <div class="total-price__wrapper">
      <div class="total-price__grn">
        <span>{{ calculatorStore.totalPrice }} грн</span>
        <p>Примерная общая стоимость работ</p>
      </div>
      <div class="total-price__dollars">
        <span>{{ calculatorStore.dollarCurrency }} $</span>
        <p>Сумма в долларах США по текущему курсу</p>
      </div>
    </div>
    <AdminButton class="visible-mobile">Войти как администратор</AdminButton>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media' as *;

.total-price {
  display: flex;
  gap: 50px;
  flex-direction: column;
  align-items: start;

  @include mobile-s {
    align-items: center;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 50px;
    padding: 100px 80px 116px 80px;
    font-weight: 700;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
    background: linear-gradient(
      180deg,
      rgba(167.1046905517578, 167.1046905517578, 172.125, 0.13),
      rgba(29, 29, 53, 0.9) 100%
    );

    @include laptop-above {
      margin-top: 50px;
    }

    @include tablet-l {
      padding: 50px 20px;
    }

    @include mobile-s {
      gap: 30px;
    }
  }

  &__grn,
  &__dollars {
    display: flex;
    flex-direction: column;
    gap: 35px;

    @include mobile-s {
      gap: 20px;
    }

    span {
      font-size: 40px;

      @include mobile-s {
        font-size: 25px;
      }
    }

    p {
      font-size: 24px;

      @include mobile-s {
        font-size: 20px;
      }
    }
  }

  .visible-mobile {
    display: none;

    @include tablet-l {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      width: 100%;
    }
  }
}
</style>
