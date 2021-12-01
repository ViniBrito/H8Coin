import { CustomGrid, Item } from "../../components/CustomGrid";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomGrid>
          <Grid item xs={12}>
            <Item style={{ marginBottom: "1%" }}>Bem-vindo(a) ao H8Coin!</Item>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2152/2152349.png"
              alt="Blockchain logo"
              width="100vw"
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ minWidth: "100%", flexShrink: 0, backgrounColor: "red" }}
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
              Acessar como COHAB (Admin)
            </Button>
          </Grid>
        </CustomGrid>
      </header>
    </div>
  );
}

export default Home;
