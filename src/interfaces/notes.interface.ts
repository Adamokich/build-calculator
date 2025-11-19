export interface NoteItem {
  note: string;
  id: number;
}

export interface NoteData {
  notesSquareRooms: NoteItem[];
  notesNecessaryWork: NoteItem[];
  notesAdminPanel: NoteItem[];
}

export type noteOptions = 'notesSquareRooms' | 'notesNecessaryWork' | 'notesAdminPanel';
