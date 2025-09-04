import { Card, CardContent, Stack, TextField, CardActions, Button } from "@mui/material";
import { NoteFormProps } from "../types";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Notes as NotesIcon,
} from "@mui/icons-material";

const NoteForm = ({
    currentNote,
    setCurrentNote,
    isEditing,
    cancelEdit, 
    updateNote,
    addNote
}: NoteFormProps) => {

    return (
      <Card elevation={2}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Note Title"
              variant="outlined"
              value={currentNote.title}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, title: e.target.value })
              }
              size="small"
            />

            <TextField
              fullWidth
              label="Note Content"
              variant="outlined"
              multiline
              rows={4}
              value={currentNote.content}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, content: e.target.value })
              }
            />
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={updateNote}
                size="small"
              >
                Update
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={cancelEdit}
                size="small"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addNote}
              size="small"
            >
              Add Note
            </Button>
          )}
        </CardActions>
      </Card>
    );
};

export default NoteForm;    