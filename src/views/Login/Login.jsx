import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";
import { getPoints } from "../../mock";
import "./Login.css";

const Login = () => {
  const { user } = useParams();
  const [showPoints, setShowPoints] = useState(false);
  const [data, setData] = useState([]);
  const size = 10;

  useEffect(() => {
    const send = async (address) => {
      const object = await getPoints(address);
      setData(object.data);
    };
    send("0x0");
  }, []);

  const PointsMenu = () => {
    return (
      <Grid item>
        <Item>
          {data.map((item, index) => (
            <ul key={index} className="init-item">
              {item.init} - {item.points} ponto
              {item.points > "1" && "s"}
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
            {user === "admin" ? "membro da COHAB" : "morador(a) do H8"}
          </Header>
        </Grid>
        {(user === "default" || user === "special") && (
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
              <CustomButton href="/form/admin?id=1">
                Adicionar apartamento
              </CustomButton>
            </Grid>
            <Grid item xs={size}>
              <CustomButton href="/form/admin?id=2">
                Adicionar morador
              </CustomButton>
            </Grid>
            <Grid item xs={size}>
              <CustomButton href="/form/admin?id=3">
                Remover morador
              </CustomButton>
            </Grid>
          </>
        )}
        {user === "special" && (
          <Grid item xs={size}>
            <CustomButton href="/form/special">Atribuir pontos</CustomButton>
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
