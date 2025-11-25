<script setup lang="ts">
import { useCalculatorStore } from '@/stores/calculator.store';
import CalculatorCheckbox from './CalculatorCheckbox.vue';
import { onMounted } from 'vue';
import NotesList from './NotesList.vue';

const calculatorStore = useCalculatorStore();

onMounted(() => calculatorStore.getOperations());
</script>

<template>
  <div class="neccesary-work">
    <h2 class="neccesary-work__title">Название необходимых работ:</h2>
    <ul class="neccesary-work__list">
      <li
        v-for="operation in calculatorStore.operations"
        :key="operation.id"
        class="neccesary-work__list-item"
      >
        <div class="neccesary-work__details">
          <p>
            {{ operation.name }}
            <span> {{ operation.count }}{{ operation.unit }} </span>
          </p>
        </div>
        <CalculatorCheckbox />
      </li>
    </ul>
    <NotesList class="neccesary-work__notes" note="notesNecessaryWork" accent-word="средняя" />
  </div>
</template>

<style scoped lang="scss">
.neccesary-work {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: start;

  &__title {
    font-size: 24px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 436px);
    column-gap: 30px;
    row-gap: 16px;

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      gap: 20px;

      p {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      span {
        color: var(--color-accent);
        font-size: 14px;
      }
    }
  }

  &__notes {
    margin-top: 11px;
  }
}
</style>
