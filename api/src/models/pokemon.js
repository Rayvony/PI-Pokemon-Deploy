const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const pokemon = sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sprite: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      def: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spAtk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spDef: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spd: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return { pokemon };
};
