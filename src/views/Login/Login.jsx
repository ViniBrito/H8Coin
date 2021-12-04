import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import FormLabel from "../../components/FormLabel";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./Login.css";

const Login = () => {
  const { user } = useParams();
  const [showPoints, setShowPoints] = useState(false);
  const [showAttr, setShowAttr] = useState(false);
  const [semLabel, setSemLabel] = useState("");
  const size = 10;
  const params = new URLSearchParams(window.location.search);
  const sample = [
    { init: "ITAndroids", points: "2" },
    { init: "BAJA", points: "3" },
    { init: "ITA Júnior", points: "2" },
    { init: "CASD", points: "1" },
  ];

  const PointsMenu = () => {
    return (
      <Grid item>
        <Item>
          {sample.map((item) => (
            <ul className="init-item">
              {item.init} - {item.points} ponto
              {item.points !== "1" && "s"}
            </ul>
          ))}
        </Item>
      </Grid>
    );
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

  const caller = (e) => {
    setSemLabel(e);
    console.log(e);
  };

  //Preciso de ajuda: os forms não sincronizam seus
  //targets.values com as variáveis de estado sem
  //recarregar a página
  const saveSem = useMemo(
    () => (
      <FormLabel
        label="Semestre"
        value={semLabel}
        onChange={(event) => caller(event.target.value)}
      />
    ),
    [semLabel]
  );

  const AttrForm = () => {
    return (
      <Grid item>
        <Item className="form">
          <FormLabel label="Endereço" />
          <FormLabel label="Semestre" />
          <FormLabel label="Pontuação" />
          <Button style={{ padding: "0.5%" }} variant="contained">
            Enviar
          </Button>
        </Item>
      </Grid>
    );
  };

  return (
    <div className="main">
      <CustomGrid>
        <Grid item xs={size}>
          <Header>
            Seja bem-vindo(a),{" "}
            {user === "admin" ? "membro da COHAB" : "morador(a) do H8-X, 720"}
          </Header>
        </Grid>
        {user === "default" && (
          <Grid item xs={size}>
            <CustomButton onClick={() => setShowPoints(!showPoints)}>
              {showPoints ? "Ocultar" : "Consultar"} meus pontos
            </CustomButton>
            {showPoints && <PointsMenu />}
          </Grid>
        )}
        {user === "admin" && (
          <>
            <Grid item xs={size}>
              <CustomButton>Adicionar apartamento</CustomButton>
            </Grid>
            <Grid item xs={size}>
              <CustomButton>Adicionar morador</CustomButton>
            </Grid>
            <Grid item xs={size}>
              <CustomButton>Remover morador</CustomButton>
            </Grid>
          </>
        )}
        {user === "default" && params.get("president") === "1" && (
          <Grid item xs={size}>
            <CustomButton onClick={() => setShowAttr(!showAttr)}>
              {showAttr ? "Cancelar atribuição" : "Atribuir pontos"}
            </CustomButton>
            {showAttr && <AttrForm />}
          </Grid>
        )}
        <Grid item xs={size}>
          <CustomButton href="/">Sair</CustomButton>
        </Grid>
      </CustomGrid>
    </div>
  );
};

export default Login;
