<script setup lang="ts">
import type { InputOptions } from '@/interfaces/input.interface';
import { computed } from 'vue';

const data = defineModel<number>();
const { label, placeholder = '0.0', gap = 8, degree = '' } = defineProps<InputOptions>();

const isNegative = computed(() => {
  return typeof data.value === 'number' && data.value < 0 ? 'isNegative' : '';
});
</script>

<template>
  <div class="calculator-field">
    <label class="calculator-field__label" :for="label">{{ label }}</label>
    <div class="calculator-field__input" :class="isNegative" :style="{ gap: `${gap}px` }">
      <input v-model="data" type="number" :id="label" :placeholder="placeholder" />
      <span :data-degree="degree">м</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calculator-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;

  &__label {
    cursor: pointer;
  }

  &__input {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      &[type='number']::-webkit-inner-spin-button,
      &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type='number'] {
        -moz-appearance: textfield;
        appearance: textfield;
      }

      &::placeholder {
        font-weight: 700;
      }

      &:focus {
        border-bottom: 1px solid var(--color-accent);
      }

      background-color: transparent;
      border: none;
      outline: none;
      color: var(--color-input);
      border-bottom: 1px solid var(--color-light);
      width: 100%;
      max-width: 50px;
      text-align: center;
    }

    span {
      position: relative;

      &::after {
        content: attr(data-degree);
        display: block;
        font-size: 10px;
        position: absolute;
        right: -7px;
        top: 0;
      }
    }
  }
}

.isNegative {
  input {
    border-bottom: 1px solid var(--color-error);

    &:focus {
      border-bottom: 1px solid var(--color-error);
    }
  }
}
</style>
