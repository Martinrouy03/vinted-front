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
import Publish from "./pages/Publish";

// Components
import Header from "./components/Header";
import ModalSignUp from "./components/ModalSignUp";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [modalValues, setModalValues] = useState([false, false]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [state, setState] = useState({ values: [0, 100] });
  const [limit, setLimit] = useState(0);
  const [sort, setSort] = useState("");
  const [str, setStr] = useState("");

  return (
    <Router>
      <Header
        visibility={modalValues}
        setVisibility={setModalValues}
        isConnected={isConnected}
        setConnexion={setIsConnected}
        state={state}
        setState={setState}
        sort={sort}
        setSort={setSort}
        str={str}
        setStr={setStr}
        setIsPublishing={setIsPublishing}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              limit={limit}
              state={state}
              sort={sort}
              setLimit={setLimit}
              setState={setState}
              setSort={setSort}
              str={str}
              setStr={setStr}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/publish"
          element={
            <Publish
              isPublishing={isPublishing}
              setIsPublishing={setIsPublishing}
            />
          }
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
          isPublishing={isPublishing}
          setIsPublishing={setIsPublishing}
        />
      )}
    </Router>
  );
}

export default App;
