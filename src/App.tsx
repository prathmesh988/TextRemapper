import { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";

import { NoteInterface } from "./types";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";
import Header from "./components/ExtensionUIheader";

function App() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const result = await chrome.storage.sync.get(["notes"]);
      if (result.notes) {
        setNotes(result.notes);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const saveNotesToStorage = async (notesToSave: NoteInterface[]) => {
    try {
      await chrome.storage.sync.set({ notes: notesToSave });
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const addNote = async () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    const newNote: NoteInterface = {
      id: Date.now().toString(),
      title: currentNote.title.trim(),
      content: currentNote.content.trim(),
      timestamp: Date.now(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
    setCurrentNote({ title: "", content: "" });
  };

  const updateNote = async () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === editingId
        ? {
            ...note,
            title: currentNote.title.trim(),
            content: currentNote.content.trim(),
            timestamp: Date.now(),
          }
        : note
    );

    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
    setCurrentNote({ title: "", content: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const editNote = (note: NoteInterface) => {
    setCurrentNote({ title: note.title, content: note.content });
    setIsEditing(true);
    setEditingId(note.id);
  };

  const deleteNote = async (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      await saveNotesToStorage(updatedNotes);
    }
  };

  const cancelEdit = () => {
    setCurrentNote({ title: "", content: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2, minHeight: "500px", width: "400px" }}>
      <Stack spacing={3}>
      
        <Header />

        <NoteForm
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingId={editingId}
          setEditingId={setEditingId}
          cancelEdit={cancelEdit}
          updateNote={updateNote}
          addNote={addNote}
        />

        <NotesList
          notes={notes}
          editNote={editNote}
          deleteNote={deleteNote}
          formatDate={formatDate}
        />
      </Stack>
    </Container>
  );
}

export default App;
