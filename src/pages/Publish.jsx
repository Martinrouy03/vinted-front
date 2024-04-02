import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Publish = ({ isConnected }) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [col, setCol] = useState("");
  const [stt, setStt] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", col);
    formData.append("condition", stt);
    formData.append("city", place);
    formData.append("price", price);
    formData.append("picture", picture);
    const myToken = Cookies.get("token");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + myToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return !isConnected ? (
    navigate("/")
  ) : (
    <div className="publish">
      <form className="container" onSubmit={handleSubmit}>
        <h1>Vends ton article</h1>
        <input
          type="file"
          onChange={(e) => {
            setPicture(e.target.files[0]);
          }}
        />
        <section>
          <div className="depot-line">
            <p>Titre</p>
            <input
              type="text"
              value={title}
              placeholder="ex: Chaussette jaune de Bung"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="depot-line">
            <p>Décris ton article</p>
            <textarea
              value={description}
              rows={5}
              placeholder="ex: Jamais portée, mais pas neuve pour autant"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="depot-line">
            <p>Marque</p>
            <input
              type="text"
              placeholder="ex: Zara"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className="depot-line">
            <p>Taille</p>
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
          <div className="depot-line">
            <p>Couleur</p>
            <input
              type="text"
              placeholder="ex: Jaune"
              value={col}
              onChange={(e) => {
                setCol(e.target.value);
              }}
            />
          </div>
          <div className="depot-line">
            <p>Etat</p>
            <input
              type="text"
              placeholder="ex: Très bon état"
              value={stt}
              onChange={(e) => {
                setStt(e.target.value);
              }}
            />
          </div>
          <div className="depot-line">
            <p>Lieu</p>
            <input
              type="text"
              placeholder="ex: Dordogne"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="depot-line">
            <p>Prix</p>
            <input
              type="text"
              placeholder="0.00 €"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <input type="checkbox" />
          <span>Je suis intéressé(e) par les échanges</span>
        </section>
        <input type="submit" className="green" value="Ajouter" />
      </form>
    </div>
  );
};
export default Publish;
