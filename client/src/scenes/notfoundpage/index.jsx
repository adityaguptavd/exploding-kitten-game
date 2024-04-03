import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{backgroundColor: "#f9ad3b"}}
    >
        <Typography variant="h3" sx={{color: "#4b3412"}}>
            Error 404 Page Not Found
        </Typography>
    </Box>
  );
};

export default NotFound;
