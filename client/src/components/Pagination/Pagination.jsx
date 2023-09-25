import React from "react";
import "./Pagination.css";

export default function Pagination({
  itemsPerPage,
  startIndex,
  currentPage,
  setCurrentPage,
  currentPokemons,
  playSelect,
}) {
  const nextPage = () => {
    playSelect();
    if (startIndex + itemsPerPage < currentPokemons.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    playSelect();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <footer className="pagination">
        <button
          className="material-symbols-rounded"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          chevron_left
        </button>
        <div className=" pageSelector">
          <p>{currentPage + 1}</p>
        </div>
        <button
          className="material-symbols-rounded"
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= currentPokemons.length}
        >
          chevron_right
        </button>
      </footer>
    </div>
  );
}
