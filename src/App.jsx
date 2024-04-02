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
import Payment from "./pages/Payment";

// Components
import Header from "./components/Header";
import ModalSignUp from "./components/ModalSignUp";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [modalValues, setModalValues] = useState([false, false]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [prices, setPrices] = useState({ values: [0, 100] });
  const [limit, setLimit] = useState();
  const [sort, setSort] = useState("");
  const [str, setStr] = useState("");

  return (
    <Router>
      <Header
        visibility={modalValues}
        setVisibility={setModalValues}
        isConnected={isConnected}
        setConnexion={setIsConnected}
        prices={prices}
        setPrices={setPrices}
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
              prices={prices}
              sort={sort}
              str={str}
              isConnected={isConnected}
              setLimit={setLimit}
              setPrices={setPrices}
              setSort={setSort}
              setStr={setStr}
              setIsPublishing={setIsPublishing}
              setVisibility={setModalValues}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={
            <Offer isConnected={isConnected} setVisibility={setModalValues} />
          }
        />
        <Route
          path="/publish"
          element={<Publish isConnected={isConnected} />}
        />
        <Route path="/payment" element={<Payment />} />
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
