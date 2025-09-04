import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, } from "@mui/icons-material";
import { NoteListProps } from "../types";
const NotesList = ({
  notes,
  editNote,
  deleteNote,
  formatDate,
}: NoteListProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="h6" component="h2">
          Your Notes
        </Typography>
        <Chip label={notes.length} color="primary" size="small" />
      </Box>

      {notes.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: "center" }}>
          No notes yet. Add your first note above!
        </Alert>
      ) : (
        <Stack spacing={2}>
          {notes
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((note) => (
              <Card
                key={note.id}
                variant="outlined"
                sx={{ position: "relative" }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      {note.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => editNote(note)}
                        color="primary"
                        title="Edit note"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteNote(note.id)}
                        color="error"
                        title="Delete note"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.4,
                    }}
                  >
                    {note.content}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {formatDate(note.timestamp)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Stack>
      )}
    </Box>
  );
};


export default NotesList;