import { useState } from "react";
import { useParams } from "react-router-dom";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";
import "./Login.css";

const Login = () => {
  const { user } = useParams();
  const [showPoints, setShowPoints] = useState(false);
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
          {sample.map((item, index) => (
            <ul key={index} className="init-item">
              {item.init} - {item.points} ponto
              {item.points !== "1" && "s"}
            </ul>
          ))}
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
            <CustomButton href="/special/form?president=1">
              Atribuir pontos
            </CustomButton>
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
