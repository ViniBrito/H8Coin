import { CustomGrid, Item } from "../../components/CustomGrid";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";

function Home() {
  const size = 12;
  return (
    <div className="App">
      <header className="App-header">
        <CustomGrid>
          <Grid item xs={size}>
            <Item
              style={{
                marginBottom: "3%",
                fontWeight: "bold",
                color: "black",
                fontSize: "30px",
                backgroundColor: "white",
              }}
            >
              Bem-vindo(a) ao H8Coin!
            </Item>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2152/2152349.png"
              alt="Blockchain logo"
              width="100vw"
            />
          </Grid>
          <Grid item xs={size / 2 + 2}>
            <CustomButton href="/login/default">
              Acessar como Usuário Padrão
            </CustomButton>
          </Grid>
          <Grid item xs={size / 2 + 2}>
            <CustomButton href="/login/special">
              Acessar como Presidente
            </CustomButton>
          </Grid>
          <Grid item xs={size / 2 + 2}>
            <CustomButton href="/login/admin">
              Acessar como COHAB (Admin)
            </CustomButton>
          </Grid>
        </CustomGrid>
      </header>
    </div>
  );
}

export default Home;
