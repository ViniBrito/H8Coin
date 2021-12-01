import { useParams } from "react-router-dom";
import "./Login.css";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Grid from "@material-ui/core/Grid";

function Login() {
  const { user } = useParams();

  const params = new URLSearchParams(window.location.search);

  return (
    <div className="main">
      <header>
        <CustomGrid>
          <Grid item xs={20}>
            <Item style={{ textAlign: "left" }}>
              Seja bem-vindo(a), morador do H8-X, 720
            </Item>
          </Grid>
          {user === "admin" && (
            <Grid item xs={20}>
              <Item>Conteúdo exclusivo para {user}</Item>
            </Grid>
          )}
          {user === "default" && params.get("president") === "1" && (
            <Grid item xs={20}>
              <Item>Conteúdo exclusivo para presidas.</Item>
            </Grid>
          )}
        </CustomGrid>
      </header>
    </div>
  );
}

export default Login;
