import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// Components
import Header from "./components/Header";
import ModalSignUp from "./components/ModalSignUp";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [modalValues, setModalValues] = useState([false, false]);
  return (
    <Router>
      <Header
        visibility={modalValues}
        setVisibility={setModalValues}
        isConnected={isConnected}
        setConnexion={setIsConnected}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
      {modalValues[0] && (
        <ModalSignUp
          setVisibility={setModalValues}
          setConnexion={setIsConnected}
        />
      )}
      {modalValues[1] && (
        <ModalLogin
          setVisibility={setModalValues}
          setConnexion={setIsConnected}
        />
      )}
    </Router>
  );
}

export default App;
