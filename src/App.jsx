import "./App.css";
import { useState } from "react";
import Home from "./views/Home";
import Login from "./views/Login";
import Form from "./views/Form";

const App = () => {
  const [info, setInfo] = useState(null);
  const [formId, setFormId] = useState("");
  const [currentView, setCurrentView] = useState("home");

  const onLogin = (userInfo) => {
    setInfo(userInfo);
    setCurrentView("login");
  }

  const openForm = (formId) => {
    setFormId(formId);
    setCurrentView("form");
  }

  switch (currentView) {
    case "login":
      return <Login info={info} openForm={openForm} />

    case "form":
      return <Form formId={formId} backCallback={() => setCurrentView("login")} />

    case "home":
    default:
       return <Home onLogin={onLogin} />
  }
};

export default App;
