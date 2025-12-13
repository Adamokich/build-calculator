import { API_ROUTES, baseURL, client } from '@/api/api';
import type { NoteData, NoteItem, noteOptions } from '@/interfaces/notes.interface';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<NoteItem[]>([]);
  const note = ref<noteOptions>('notesSquareRooms');
  const accentColor = '#ff5f13';

  async function getNotes(note: string): Promise<NoteItem[] | undefined> {
    const { data } = await client().get<NoteData>(baseURL + API_ROUTES.notes);

    switch (note) {
      case 'notesSquareRooms':
        return (notes.value = data.notesSquareRooms);
      case 'notesNecessaryWork':
        return (notes.value = data.notesNecessaryWork);
      case 'notesAdminPanel':
        return (notes.value = data.notesAdminPanel);
    }
  }

  function getAccentWord(noteText: string, word: string): string {
    if (!word) return noteText;

    const regex = new RegExp(`(${word})`, 'gi');

    return noteText.replace(regex, `<span style="color: ${accentColor}">${word}</span>`);
  }

  return { notes, note, getNotes, getAccentWord };
});
