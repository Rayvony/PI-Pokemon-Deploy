import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postPkmn } from "../../api-helpers/apiService";
import { cleanPkmnByName, getAllPkmns } from "../../redux/actions";
import { FormField, validate } from "./formHelper";
import "./Form.css";

export default function Form({ playSelect }) {
  const pkmnTypes = useSelector((state) => state.pkmnTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    sprite: "",
    atk: "",
    spAtk: "",
    def: "",
    spDef: "",
    spd: "",
    height: "",
    weight: "",
    type1: "",
    type2: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = value === "noType" ? "" : value;
    const lowercaseName =
      name === "name" ? updatedValue.toLowerCase() : updatedValue;
    setFormData({
      ...formData,
      [name]: lowercaseName,
    });
  };

  const handleSubmit = async (event) => {
    playSelect();
    event.preventDefault();
    if (!validate(formData)) return;

    try {
      await postPkmn(formData);
      dispatch(getAllPkmns());
      console.log("pokemon creado");
      dispatch(cleanPkmnByName());
      navigate("/home");
    } catch (error) {
      console.log("Error al crear el Pokémon");
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formTitle">Create your own Pokemon!</h2>
      <form onSubmit={handleSubmit}>
        <div className="centered">
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            isNumber={false}
          />

          <div className="sprite">
            <FormField
              label="Sprite"
              name="sprite"
              value={formData.sprite}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="side-by-side">
          <FormField
            label="HP"
            name="hp"
            value={formData.hp}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />

          <FormField
            label="SPD"
            name="spd"
            value={formData.spd}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />
        </div>

        <div className="side-by-side">
          <FormField
            label="ATK"
            name="atk"
            value={formData.atk}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />

          <FormField
            label="SP.ATK"
            name="spAtk"
            value={formData.spAtk}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />
        </div>

        <div className="side-by-side">
          <FormField
            label="DEF"
            name="def"
            value={formData.def}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />

          <FormField
            label="SP.DEF"
            name="spDef"
            value={formData.spDef}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />
        </div>

        <div className="side-by-side">
          <FormField
            label="Height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />

          <FormField
            label="Weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
            type="number"
            isNumber={true}
          />
        </div>

        <div className="types-container">
          <label className="formLabel">Types:</label>
          <div className="side-by-side">
            <select
              className="formInput formSelect"
              name="type1"
              value={formData.type1}
              onChange={handleInputChange}
            >
              <option value="Type 1">Type 1</option>
              {pkmnTypes?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <select
              className="formInput formSelect"
              name="type2"
              value={formData.type2}
              onChange={handleInputChange}
              disabled={formData.type1 === formData.type2}
            >
              <option value="noType"> - </option>
              {pkmnTypes?.map((type) => (
                <option
                  key={type.id}
                  value={type.id}
                  disabled={type.id === formData.type1}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="formButton"
          type="submit"
          disabled={!validate(formData)}
        >
          Create Pokemon
        </button>
      </form>
    </div>
  );
}
