<script setup lang="ts">
import type { noteOptions } from '@/interfaces/notes.interface';
import { useCalculatorStore } from '@/stores/calculator.store';
import { onMounted } from 'vue';

const calculatorStore = useCalculatorStore();
const { note } = defineProps<{ note: noteOptions }>();

onMounted(() => calculatorStore.getNotes(note));
</script>

<template>
  <div class="notes">
    <ul class="notes__list">
      Примечания:
      <li v-for="item in calculatorStore.notes" :key="item.id" class="notes__list-item">
        {{ item.note }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.notes {
  margin-top: 11px;

  &__list {
    color: var(--color-accent);
    list-style: none;
    display: flex;
    flex-direction: column;

    &-item {
      position: relative;
      color: var(--color-light);

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        background-color: var(--color-accent);
        border-radius: 50%;
        position: absolute;
        left: -14px;
        top: 10px;
      }
    }
  }
}
</style>
