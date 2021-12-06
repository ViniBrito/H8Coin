import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormAlert = ({ open, setOpen, validation }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
    >
      {validation ? (
        <Alert severity="warning" sx={{ width: "100%" }}>
          Reveja o formulário!
        </Alert>
      ) : (
        <Alert severity="success" sx={{ width: "100%" }}>
          Formulário enviado com sucesso!
        </Alert>
      )}
    </Snackbar>
  );
};

export default FormAlert;
