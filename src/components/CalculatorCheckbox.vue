<script setup lang="ts">
const data = defineModel();
</script>

<template>
  <input class="calculator-checkbox" type="checkbox" v-model="data" />
</template>

<style scoped lang="scss">
.calculator-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid var(--color-light);
  width: 15px;
  height: 15px;

  &:checked::before {
    content: '';
    position: absolute;
    inset: 0;
    display: block;
    background: url('../assets/icons/check.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }

  &:focus {
    box-shadow: 0 0 0 1px var(--color-accent);
  }
}
</style>
