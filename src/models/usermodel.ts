import { Model, DataTypes, Sequelize } from '@sequelize/core';

class UserModel extends Model {
  public username!: string;
  public email!: string;
  public password!: string;

  // Other methods or properties can be added here

  // Static method to define associations
  public static associate(models: any): void {
    // Define your associations here
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes): typeof UserModel => {
  UserModel.init({
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
  }, {
    sequelize,
    modelName: 'userModel',
  });

  return UserModel;
};
