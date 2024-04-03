import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

const CustomSnack = ({ closeSnackbar, open, mssg, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        closeSnackbar();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => {
          closeSnackbar();
        }}
        severity={severity ? severity : "error"}
        variant="filled"
      >
        {mssg}
      </Alert>
    </Snackbar>
  );
};

CustomSnack.propTypes = {
  closeSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  mssg: PropTypes.string.isRequired,
  severity: PropTypes.string,
};

export default CustomSnack;