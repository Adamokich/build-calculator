<script setup lang="ts">
import CalculatorCheckbox from './CalculatorCheckbox.vue';
import { onActivated, onMounted } from 'vue';
import NotesList from './NotesList.vue';
import { useNotesStore } from '@/stores/notes.store';
import { useOperationsStore } from '@/stores/operations.store';

const operationsStore = useOperationsStore();
const notesStore = useNotesStore();

onMounted(() => operationsStore.getOperations());
onActivated(() => {
  notesStore.note = 'notesNecessaryWork';
});
</script>

<template>
  <div class="neccesary-work">
    <h2 class="neccesary-work__title">Название необходимых работ:</h2>
    <ul class="neccesary-work__list">
      <li
        v-for="operation in operationsStore.operations"
        :key="operation.id"
        class="neccesary-work__list-item"
      >
        <div class="neccesary-work__details">
          <p>
            {{ operation.name }}
            <span>
              {{ operation.count }}<span data-exponent="2">{{ operation.unit }}</span>
            </span>
          </p>
        </div>
        <CalculatorCheckbox v-model="operation.isActive" />
      </li>
    </ul>
    <NotesList class="neccesary-work__notes" :note="notesStore.note" accent-word="средняя" />
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

        &[data-exponent] {
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
    }
  }

  &__notes {
    margin-top: 11px;
  }
}
</style>
