import { DataTypes, Sequelize } from "sequelize";

function createUserModel(sequelize: Sequelize) {
    const User = sequelize.define('User', {
        authId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        }
    })

    return User;
}

export default createUserModel;