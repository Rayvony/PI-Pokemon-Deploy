function handleErrors(errorCase) {
  switch (errorCase) {
    case 1:
      throw new Error("No Pokémon found with the provided name.");
    case 2:
      throw new Error("No Pokémon found with the provided ID.");
    case 3:
      throw new Error("No type found with the provided ID.");
    case 4:
      throw new Error(
        "An error occurred while searching for the Pokémon in the database."
      );
    case 5:
      throw new Error(
        "An error occurred while adding a new Pokémon to the database."
      );
    default:
      throw new Error("Error: " + errorCase);
  }
}

module.exports = {
  handleErrors,
};
