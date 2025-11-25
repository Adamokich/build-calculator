<script setup lang="ts">
import type { noteOptions } from '@/interfaces/notes.interface';
import { useNotesStore } from '@/stores/notes.store';
import { onMounted } from 'vue';

const notesStore = useNotesStore();
const { note, accentWord = '' } = defineProps<{ note: noteOptions; accentWord?: string }>();

onMounted(() => notesStore.getNotes(note));
</script>

<template>
  <div class="notes">
    <ul class="notes__list">
      Примечания:
      <li
        v-for="item in notesStore.notes"
        :key="item.id"
        class="notes__list-item"
        v-html="notesStore.getAccentWord(item.note, accentWord)"
      ></li>
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
