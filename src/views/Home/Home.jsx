import "./Home.css";
import { CustomGrid, Item } from "../../components/CustomGrid";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomGrid>
          <Grid item xs={12}>
            <Item>Bem-vindo(a) ao H8Coin!</Item>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ minWidth: "100%", flexShrink: 0 }}
              variant="contained"
              href="/login/default"
            >
              Acessar como Usuário padrão
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ minWidth: "100%", flexShrink: 0 }}
              variant="contained"
              href="/login/admin"
            >
              Acessar como Admin
            </Button>
          </Grid>
        </CustomGrid>
      </header>
    </div>
  );
}

export default Home;
