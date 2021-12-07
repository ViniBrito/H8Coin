import { CustomGrid, Item } from "../../components/CustomGrid";
import CustomButton from "../../components/CustomButton";
import Grid from "@material-ui/core/Grid";
import { connectMetaMask, getMyInfo } from "../../web3";

const Home = (props) => {
  async function connect() {
    try {
      if (!await connectMetaMask()) {
        throw new Error();
      }

      const result = await getMyInfo();
      if (result === null) {
        throw new Error();
      }
      
      props.onLogin(result);
      return;
    } catch (ex) {
      console.log(ex);
    }

    alert('Não conectado!');
  }

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
            <p style={{ color: "black" }}>Escolha abaixo sua opção de login</p>
          </Grid>
          <Grid item xs={size / 2 + 2}>
            <CustomButton onClick={connect}>Conectar com o MetaMask</CustomButton>
          </Grid>
        </CustomGrid>
      </header>
    </div>
  );
}

export default Home;
