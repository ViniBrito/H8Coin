import { useState } from "react";
import React from "react";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import FormLabel from "../../components/FormLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";
import "./Form.css";

const Form = () => {
  const size = 10;
  const [addrLabel, setAddrLabel] = useState("");
  const [semLabel, setSemLabel] = useState("");
  const [ptsLabel, setPtsLabel] = useState("");
  const [open, setOpen] = useState(false);

  const callerAddr = (e) => {
    setAddrLabel(e);
  };

  const callerSem = (e) => {
    setSemLabel(e);
  };

  const callerPts = (e) => {
    setPtsLabel(e);
  };

  const checkSem = (input) => {
    console.log(input);
    const valid = /[1-9][0-9][0-9][0-9]\/[1-2]/;
    return !valid.test(input);
  };

  const checkPts = (input) => {
    const valid = /[0-2]\.[0|5]/;
    return !valid.test(input);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="main">
      <CustomGrid>
        <Grid item xs={size}>
          <Header>Atribuição de pontos de membros</Header>
          <Grid item>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Item className="form">
                <FormLabel
                  value={addrLabel}
                  onChange={(event) => {
                    callerAddr(event.target.value);
                  }}
                  label="Endereço"
                />
                <FormLabel
                  value={semLabel}
                  onChange={(event) => {
                    callerSem(event.target.value);
                  }}
                  error={checkSem(semLabel)}
                  label="Semestre"
                  help={checkSem(semLabel) && "Insira no formato ''2021/1''."}
                />
                <FormLabel
                  value={ptsLabel}
                  onChange={(event) => {
                    callerPts(event.target.value);
                  }}
                  error={checkPts(ptsLabel)}
                  label="Pontuação"
                  help={checkPts(ptsLabel) && "Insira no formato ''1.0''."}
                />
                <Button
                  style={{ padding: "0.5%" }}
                  onClick={() => setOpen(!open)}
                  variant="contained"
                >
                  Enviar
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={() => setOpen(!open)}
                >
                  {checkSem(semLabel) || checkPts(ptsLabel) ? (
                    <Alert severity="warning" sx={{ width: "100%" }}>
                      Reveja o formulário!
                    </Alert>
                  ) : (
                    <Alert severity="success" sx={{ width: "100%" }}>
                      Formulário enviado com sucesso!
                    </Alert>
                  )}
                </Snackbar>
              </Item>
            </form>
          </Grid>
        </Grid>
      </CustomGrid>
    </div>
  );
};

export default Form;
