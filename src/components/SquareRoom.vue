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
          <CalculatorInput
            class="square-room__params-field"
            :label="square.name"
            :exponent="'2'"
            v-model="square.value"
            unit="м"
          />
        </li>
      </ul>
    </div>
    <NotesList :note="notesStore.note" />
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media' as *;

.square-room {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;

  &__height-calculator {
    display: flex;

    @include mobile {
      align-items: end;
      gap: 20px;
    }
  }

  &__params {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @include mobile {
      align-items: start;
    }

    &-title {
      width: 100%;
      max-width: 392px;
      border-bottom: 1px solid var(--color-light);
      font-size: 24px;

      @include mobile {
        font-size: 18px;
        max-width: 262px;
      }

      @include mobile-s {
        font-size: 16px;
      }
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 90px;
      row-gap: 26px;

      @include laptop {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &-field {
      @include mobile {
        gap: 20px;
      }
    }
  }
}

.isNegative {
  border-bottom: 1px solid var(--color-error);
}
</style>
