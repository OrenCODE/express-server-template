import { DataTypes } from 'sequelize';
import sequelize from '../../sequelize/sequelize';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'users',
  },
);

export default User;
