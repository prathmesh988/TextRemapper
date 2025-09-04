export interface NoteInterface {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}
export interface NoteListProps {
  notes: NoteInterface[];
  editNote: (note: NoteInterface) => void;
  deleteNote: (id: string) => void;
  formatDate: (timestamp: number) => string;
}

export interface NoteFormProps {
  currentNote: { title: string; content: string };
  setCurrentNote: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  cancelEdit: () => void;
  updateNote: () => void;
  addNote: () => void;
}
