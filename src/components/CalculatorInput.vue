<script setup lang="ts">
import type { InputOptions } from '@/interfaces/input.interface';
import { computed } from 'vue';

const data = defineModel<number | null | undefined>();
const {
  label,
  unit = 'м',
  placeholder = '0.0',
  gap = 8,
  exponent = '',
  fontSize = 18,
  isAdminPanel = false,
} = defineProps<InputOptions>();

const isNegative = computed(() => {
  return typeof data.value === 'number' && data.value < 0 ? 'isNegative' : '';
});

const isAdminPanelInput = computed(() =>
  isAdminPanel ? 'calculator-field__input-admin' : 'calculator-field__input',
);
</script>

<template>
  <div class="calculator-field">
    <label class="calculator-field__label" :for="label">{{ label }}</label>
    <div :class="`${isNegative} ${isAdminPanelInput}`" :style="{ gap: `${gap}px` }">
      <input v-model="data" type="number" :id="label" :placeholder="String(placeholder)" />
      <span
        :style="{ fontSize: `${fontSize}px` }"
        class="calculator-field__exponent"
        :data-exponent="exponent"
        >{{ unit }}</span
      >
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

  &__input,
  &__input-admin {
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
      max-width: 66px;
      text-align: center;
    }

    span {
      position: relative;

      &::after {
        content: attr(data-exponent);
        font-weight: 700;
        display: block;
        font-size: 10px;
        position: absolute;
        right: -7px;
        top: 0;
      }
    }
  }

  &__input-admin {
    input {
      font-size: 14px;
      &::placeholder {
        font-size: 14px;
      }
    }
  }

  &__exponent {
    font-weight: 700;
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
