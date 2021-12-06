import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";
import { getPoints, getApts } from "../../mock";
import "./Login.css";

const Login = () => {
  const { user } = useParams();
  const [showPoints, setShowPoints] = useState(false);
  const [showAps, setShowAps] = useState(false);
  const [data, setData] = useState([]);
  const [apts, setApts] = useState([]);
  const size = 10;

  useEffect(() => {
    const send = async (address) => {
      const object = await getPoints(address);
      setData(object.data);
      const newObject = await getApts();
      setApts(newObject.data);
    };
    send("0x0");
  }, []);

  const getFree = (v) => {
    let a = [];
    let vagas = ["A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < v.length; i++) {
      if (v[i] === 1) {
        a.push(vagas[i]);
        a.push(",");
      }
    }
    a.pop();
    return a;
  };

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

  const ApsMenu = () => {
    return (
      <Item>
        <table>
          <thead>
            <tr>
              <th> Bloco </th>
              <th> Número </th>
              <th> Vagas </th>
              <th> Vagas Disponíveis </th>
              <th> Postular </th>
            </tr>
          </thead>
          <tbody>
            {apts.map((item) => (
              <tr className="init-item">
                <td align="center"> {item.block}</td>
                <td align="center"> {item.apt}</td>
                <td align="center"> {item.G}</td>
                <td align="center"> {getFree(item.J)}</td>
                <td align="center">
                  <CustomButton
                    style={{
                      marginBottom: "5%",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "10px",
                      backgroundColor: "gray",
                    }}
                  >
                    Selecionar
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Item>
    );
  };

  return (
    <div className="main">
      <CustomGrid>
        <Grid item xs={size}>
          <Header>
            Seja bem-vindo(a),{" "}
            {user === "admin"
              ? "membro da COHAB"
              : user === "default"
              ? "morador(a) do H8"
              : "presidente de iniciativa"}
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
        {user === "default" && (
          <Grid item xs={size}>
            <CustomButton onClick={() => setShowAps(!showAps)}>
              {showAps ? "Ocultar" : "Consultar"} apartamentos disponíveis
            </CustomButton>
            {showAps && <ApsMenu />}
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
