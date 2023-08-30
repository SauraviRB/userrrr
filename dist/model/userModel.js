import { DataTypes } from "@sequelize/core";
import { sequelize } from "../auth.js";
export const userModel = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //   token:{
    //     type: DataTypes.STRING,
    //     unique:true,
    //   }
});
// User.beforeCreate(async (user: User) => {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//   });
// };
