import { useState, useEffect } from "react";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";
//import { getPoints, getApts } from "../../mock";
import { getPoints, getApts } from "../../web3";
import "./Login.css";

const Login = (props) => {
  const [showPoints, setShowPoints] = useState(false);
  const [showAps, setShowAps] = useState(false);
  const [data, setData] = useState([]);
  const [apts, setApts] = useState([]);
  const size = 10;

  useEffect(() => {
    const fetchData = async () => {
      if (!props.info.cohab) {
        getPoints().then(result => {
          if (result !== null) {
            setData(result);
          }
        });
      }

      getApts().then(result => {
        if (result !== null) {
          setApts(result);
        }
      });
    }
    fetchData();
  }, [props.info.cohab]);

  const getFree = (v) => {
    let a = [];
    let vagas = ["A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < v.length; i++) {
      if (v[i] === 0) {
        a.push(vagas[i]);
        a.push(", ");
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
              {item.initiative} - {item.score} ponto
              {item.score >= 2 && "s"}
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
              {!props.info.cohab && (<th> Postular </th>)}
            </tr>
          </thead>
          <tbody>
            {apts.map((item) => (
              <tr className="init-item" key={item.apCode}>
                <td align="center"> {item.apBlock}</td>
                <td align="center"> {item.apCode}</td>
                <td align="center"> {item.numSpots}</td>
                <td align="center"> {getFree(item.students)}</td>
                {!props.info.cohab && (<td align="center">
                    {getFree(item.students).length > 0 &&
                      <CustomButton
                        style={{
                          marginBottom: "5%",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "5px",
                          backgroundColor: "gray",
                        }}
                      >
                        Selecionar
                      </CustomButton>}
                  </td>
                )}
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
            Seja bem-vindo,{" "}
            {props.info.name}
          </Header>
        </Grid>
        {!props.info.cohab && (
          <Grid item xs={size}>
            <CustomButton onClick={() => setShowPoints(!showPoints)}>
              {showPoints ? "Ocultar" : "Consultar"} meus pontos
            </CustomButton>
            {showPoints && <PointsMenu />}
          </Grid>
        )}
        <Grid item xs={size}>
          <CustomButton onClick={() => setShowAps(!showAps)}>
            {showAps ? "Ocultar" : "Consultar"} apartamentos disponíveis
          </CustomButton>
          {showAps && <ApsMenu />}
        </Grid>
        {props.info.cohab && (
          <>
            <Grid item xs={size}>
              <CustomButton onClick={() => props.openForm("1")}>
                Adicionar apartamento
              </CustomButton>
            </Grid>
            <Grid item xs={size}>
              <CustomButton onClick={() => props.openForm("2")}>
                Adicionar morador
              </CustomButton>
            </Grid>
            <Grid item xs={size}>
              <CustomButton onClick={() => props.openForm("3")}>
                Remover morador
              </CustomButton>
            </Grid>
          </>
        )}
        {props.info.president && (
          <Grid item xs={size}>
            <CustomButton onClick={() => props.openForm("0")}>Atribuir pontos</CustomButton>
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
