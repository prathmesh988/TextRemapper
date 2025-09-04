import { Box, Typography } from "@mui/material";
import { Notes as NotesIcon } from "@mui/icons-material";
const Header = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <NotesIcon color="primary" />
          Note Taker
        </Typography>
      </Box>
    );
}

export default Header;