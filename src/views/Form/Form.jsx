import { useState } from "react";
import React from "react";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import FormLabel from "../../components/FormLabel";
import FormAlert from "../../components/FormAlert";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { sendForm } from "../../mock";
import { assignScore } from "../../web3";
import "./Form.css";

const Form = (props) => {
  const size = 10;

  const [addrLabel, setAddrLabel] = useState("");
  const [semLabel, setSemLabel] = useState("");
  const [ptsLabel, setPtsLabel] = useState("");

  const [blkLabel, setBlkLabel] = useState("");
  const [numLabel, setNumLabel] = useState("");
  const [availLabel, setAvailLabel] = useState("");

  const [nameLabel, setNameLabel] = useState("");
  const [yearLabel, setYearLabel] = useState("");

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

  const callerBlk = (e) => {
    setBlkLabel(e);
  };

  const callerNum = (e) => {
    setNumLabel(e);
  };

  const callerAvail = (e) => {
    setAvailLabel(e);
  };

  const callerName = (e) => {
    setNameLabel(e);
  };

  const callerYear = (e) => {
    setYearLabel(e);
  };

  const checkAddr = (input) => {
    return input.length === 0;
  };

  const checkSem = (input) => {
    const valid = /[1-9][0-9][0-9][0-9]\/[1-2]/;
    return !valid.test(input);
  };

  const checkPts = (input) => {
    const valid = /[0-2]\.[0|5]/;
    return !valid.test(input);
  };

  const checkBlk = (input) => {
    const valid = /[A-D]/;
    return !valid.test(input);
  };

  const checkNum = (input) => {
    const valid = /[1-3][0-4][0-9]/;
    return !valid.test(input);
  };

  const checkYear = (input) => {
    const valid = /20[0-9][0-9]/;
    return !valid.test(input);
  };

  const checkName = (input) => {
    return input.length === 0;
  };

  return (
    <div className="main">
      <CustomGrid>
        <Grid item xs={size}>
          {props.formId === "0" && (
            <>
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
                      help={
                        checkSem(semLabel) && "Insira no formato ''2021/1''."
                      }
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
                      type="submit"
                      onClick={() => {
                        if (
                          !(
                            checkAddr(addrLabel) ||
                            checkSem(semLabel) ||
                            checkPts(ptsLabel)
                          )
                        )
                          assignScore(addrLabel, parseInt(semLabel.replace("/", "")), parseInt(10 * parseFloat(ptsLabel))).then((result) => {
                            alert(result);
                            if (result === "OK") props.backCallback();
                          });
                        setOpen(true);
                      }}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                    <Button
                      style={{ padding: "0.5%" }}
                      onClick={props.backCallback}
                    >
                      Voltar
                    </Button>
                    <FormAlert
                      open={open}
                      setOpen={setOpen}
                      validation={
                        checkAddr(addrLabel) ||
                        checkSem(semLabel) ||
                        checkPts(ptsLabel)
                      }
                    />
                  </Item>
                </form>
              </Grid>
            </>
          )}
          {props.formId === "1" && (
            <>
              <Header>Adição de apartamento</Header>
              <Grid item>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <Item className="form">
                    <FormLabel
                      value={blkLabel}
                      onChange={(event) => {
                        callerBlk(event.target.value);
                      }}
                      label="Bloco"
                      error={checkBlk(blkLabel)}
                      help={checkBlk(blkLabel) && "Bloco inválido."}
                    />
                    <FormLabel
                      value={numLabel}
                      onChange={(event) => {
                        callerNum(event.target.value);
                      }}
                      error={checkNum(numLabel)}
                      label="Número"
                      help={checkNum(numLabel) && "Número inválido."}
                    />
                    <FormLabel
                      value={availLabel}
                      onChange={(event) => {
                        callerAvail(event.target.value);
                      }}
                      label="Vagas"
                    />
                    <Button
                      style={{ padding: "0.5%" }}
                      type="submit"
                      onClick={() => {
                        if (!(checkNum(numLabel) || checkBlk(blkLabel)))
                          sendForm({
                            block: blkLabel,
                            number: parseInt(numLabel),
                            available: availLabel,
                          });
                        setOpen(true);
                      }}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                    <FormAlert
                      open={open}
                      setOpen={setOpen}
                      validation={checkNum(numLabel) || checkBlk(blkLabel)}
                    />
                  </Item>
                </form>
              </Grid>
            </>
          )}
          {props.formId === "2" && (
            <>
              <Header>Adição de apartamento</Header>
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
                      value={nameLabel}
                      onChange={(event) => {
                        callerName(event.target.value);
                      }}
                      label="Nome"
                    />
                    <FormLabel
                      value={yearLabel}
                      onChange={(event) => {
                        callerYear(event.target.value);
                      }}
                      error={checkYear(yearLabel)}
                      label="Ano"
                      help={checkYear(yearLabel) && "Ano inválido."}
                    />
                    <Button
                      style={{ padding: "0.5%" }}
                      type="submit"
                      onClick={() => {
                        if (
                          !(
                            checkAddr(addrLabel) ||
                            checkYear(yearLabel) ||
                            checkName(nameLabel)
                          )
                        )
                          sendForm({
                            address: addrLabel,
                            name: nameLabel,
                            year: parseInt(yearLabel),
                          });
                        setOpen(true);
                      }}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                    <FormAlert
                      open={open}
                      setOpen={setOpen}
                      validation={
                        checkAddr(addrLabel) ||
                        checkYear(yearLabel) ||
                        checkName(nameLabel)
                      }
                    />
                  </Item>
                </form>
              </Grid>
            </>
          )}
          {props.formId === "3" && (
            <>
              <Header>Remoção de morador</Header>
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
                    <Button
                      style={{ padding: "0.5%" }}
                      type="submit"
                      onClick={() => {
                        if (!checkAddr(addrLabel))
                          sendForm({
                            address: addrLabel,
                          });
                        setOpen(true);
                      }}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                    <FormAlert
                      open={open}
                      setOpen={setOpen}
                      validation={checkAddr(addrLabel)}
                    />
                  </Item>
                </form>
              </Grid>
            </>
          )}
        </Grid>
      </CustomGrid>
    </div>
  );
};

export default Form;
