import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faHeart, faMagnifyingGlass);

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Offers from "./pages/Offers";

// Components
import Header from "./components/Header";
import ModalSignUp from "./components/ModalSignUp";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [modalValues, setModalValues] = useState([false, false]);
  const [query, setQuery] = useState("");
  const [state, setState] = useState({ values: [0, 100] });
  const [limit, setLimit] = useState(0);

  return (
    <Router>
      <Header
        visibility={modalValues}
        setVisibility={setModalValues}
        isConnected={isConnected}
        setConnexion={setIsConnected}
        setQuery={setQuery}
        state={state}
        setState={setState}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              limit={limit}
              setLimit={setLimit}
              setQuery={setQuery}
              setState={setState}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/offers/"
          element={<Offers query={query} state={state} />}
        />
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
