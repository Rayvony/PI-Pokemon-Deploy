import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filter, order, filterType } from "../../redux/actions";

export default function Filters({ setCurrentPage, playSelect }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const pkmnTypes = useSelector((state) => state.pkmnTypes);

  let filterValue, filterTypeValue, orderValue, orderType;
  const handleFilter = (event) => {
    playSelect();
    event.target.blur();
    setCurrentPage(0);
    const { name, value } = event.target;

    switch (name) {
      case "filter":
        filterValue = value;
        break;

      case "filterType":
        filterTypeValue = value;
        break;

      case "order":
        orderValue = value;
        break;

      case "orderType":
        orderType = value;
        break;
      default:
        break;
    }
    dispatch(filter(filterValue));
    dispatch(filterType(filterTypeValue));
    dispatch(order(orderType, orderValue));
  };

  const playMenu = () => {
    const audio = new Audio("../../../assets/emerald_menu.wav");
    audio.play();
  };

  if (location.pathname === "/home") {
    return (
      <div className="filtersContainer">
        <p>Filter by:</p>
        <select
          className="filterSelect"
          name="filter"
          onChange={handleFilter}
          defaultValue={"all"}
          onFocus={playMenu}
        >
          <option value="all">All</option>
          <option value="false">Official</option>
          <option value="true">Created</option>
        </select>
        <select
          className="filterSelect"
          name="filterType"
          onChange={handleFilter}
          defaultValue={"all"}
          onFocus={playMenu}
        >
          <option value="all">Type</option>
          {pkmnTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {" "}
              {type.name}{" "}
            </option>
          ))}
        </select>
        <p>Order by:</p>
        <select
          className="filterSelect"
          name="orderType"
          onChange={handleFilter}
          defaultValue={"-"}
          onFocus={playMenu}
        >
          <option value="none"> - </option>
          <option value="name">Name</option>
          <option value="atk">Attack</option>
        </select>

        <select
          className="filterSelect"
          name="order"
          onChange={handleFilter}
          defaultValue={"none"}
          onFocus={playMenu}
        >
          <option value="none"> - </option>
          <option value="A">Ascending</option>
          <option value="D">Descending</option>
        </select>
      </div>
    );
  }
  return null;
}
