import logo from "../../assets/logo.svg";
import { useParams } from "react-router-dom";
import "./Home.css";

function Login() {
  const { user } = useParams();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>José Hamilton esteve aqui</p>
        <p>Versão {user} da página.</p>
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

export default Login;
