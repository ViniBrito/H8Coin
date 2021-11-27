import logo from "../../assets/logo.svg";
import "./Home.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Toda jornada começa com o primeiro passo.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprenda React
        </a>
      </header>
    </div>
  );
}

export default Home;
