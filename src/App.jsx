import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Form from "./views/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login/:user" element={<Login />} />
        <Route path="/form/:user" element={<Form />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
