<script setup lang="ts">
import { useCalculatorStore } from '@/stores/calculator.store';
import CalculatorInput from './CalculatorInput.vue';
import { onActivated, onMounted } from 'vue';
import NotesList from './NotesList.vue';
import { useNotesStore } from '@/stores/notes.store';

const calculatorStore = useCalculatorStore();
const notesStore = useNotesStore();

onMounted(() => calculatorStore.getSquares());
onActivated(() => {
  notesStore.note = 'notesSquareRooms';
});
</script>

<template>
  <div class="square-room">
    <div class="square-room__height">
      <CalculatorInput
        v-model="calculatorStore.ceilingHeight"
        class="square-room__height-calculator"
        label="Высота потолка в квартире:"
        :gap="17"
      />
    </div>
    <div class="square-room__params">
      <h2 class="square-room__params-title">Площадь отдельных комнат:</h2>
      <ul class="square-room__params-list">
        <li
          v-for="square in calculatorStore.squares"
          :key="square.id"
          class="square-room__params-item"
        >
          <CalculatorInput :label="square.name" :exponent="'2'" v-model="square.value" />
        </li>
      </ul>
    </div>
    <NotesList :note="notesStore.note" />
  </div>
</template>

<style scoped lang="scss">
.square-room {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;

  &__height-calculator {
    display: flex;
    gap: 68px;
  }

  &__params {
    display: flex;
    flex-direction: column;
    gap: 40px;

    &-title {
      width: 100%;
      max-width: 392px;
      border-bottom: 1px solid var(--color-light);
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 90px;
      row-gap: 26px;
    }
  }
}

.isNegative {
  border-bottom: 1px solid var(--color-error);
}
</style>
