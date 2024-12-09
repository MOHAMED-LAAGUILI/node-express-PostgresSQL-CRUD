import { DataTypes } from "sequelize";

export const createUserModel = (sequelize) => {
  
    const User = sequelize.define("User",{
      name:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type:DataTypes.STRING,
        allowNull: false,
        isLowerCase:true,
        unique:true,
      },
      designation:{
        type:DataTypes.STRING,
        allowNull: false,
      },
    });

    return User;
}