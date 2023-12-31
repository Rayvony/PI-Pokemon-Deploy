const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const type = sequelize.define('Type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return { type };
}