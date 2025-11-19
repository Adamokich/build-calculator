import { API_ROUTES, client } from '@/api/api';
import type { NoteData, NoteItem } from '@/interfaces/notes.interface';
import type { SquareItem } from '@/interfaces/square.interface';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
  const squares = ref<SquareItem[]>([]);
  const notes = ref<NoteItem[]>([]);
  const ceilingHeight = ref<number | undefined>();
  const calculatedSquaresValues = ref<SquareItem[]>([]);

  async function getSquares(): Promise<void> {
    const { data } = await client().get<SquareItem[]>(API_ROUTES.squares);

    squares.value = data.map((item) => {
      if (item.value === 0) {
        return { ...item, value: undefined };
      }

      return item;
    });
  }

  async function getNotes(note: string): Promise<NoteItem[] | undefined> {
    const { data } = await client().get<NoteData>(API_ROUTES.notes);

    switch (note) {
      case 'notesSquareRooms':
        return (notes.value = data.notesSquareRooms);
      case 'notesNecessaryWork':
        return (notes.value = data.notesNecessaryWork);
      case 'notesAdminPanel':
        return (notes.value = data.notesAdminPanel);
    }
  }

  const calculatedCeilingHeight = computed(() => {
    if (ceilingHeight.value === undefined) {
      return 0;
    }

    if (ceilingHeight.value < 0) {
      return 0;
    }

    return ceilingHeight.value;
  });

  watch(
    squares,
    (newValue) => {
      calculatedSquaresValues.value = newValue.map((item) => {
        if (item.value === undefined) {
          return { ...item, value: 0 };
        }

        if (item.value < 0) {
          return { ...item, value: 0 };
        }

        return item;
      });
    },
    { deep: true },
  );

  return { squares, notes, ceilingHeight, calculatedCeilingHeight, getSquares, getNotes };
});
