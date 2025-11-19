<script setup lang="ts"></script>

<template>
  <div class="total-price">
    <div class="total-price__grn">
      <span>0 грн</span>
      <p>Примерная общая стоимость работ</p>
    </div>
    <div class="total-price__dollars">
      <span>0 $</span>
      <p>Сумма в долларах США по текущему курсу</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.total-price {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 50px;
  margin-top: 45px;
  padding: 100px 80px 116px 80px;
  font-weight: 700;
  box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.5);
  background: linear-gradient(
    180deg,
    rgba(167.1046905517578, 167.1046905517578, 172.125, 0.13),
    rgba(29, 29, 53, 0.9) 100%
  );

  &__grn,
  &__dollars {
    display: flex;
    flex-direction: column;
    gap: 35px;

    span {
      font-size: 40px;
    }

    p {
      font-size: 24px;
    }
  }
}
</style>
