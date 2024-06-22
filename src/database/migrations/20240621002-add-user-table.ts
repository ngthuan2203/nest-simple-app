import { DataTypes, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('Users', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false
    },

    lastName: {
      type: DataType.STRING,
      allowNull: false
    },
    age: {
      type: DataType.INTEGER
    },
    nationality: {
      type: DataType.STRING
    }
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('ClientReports');
};
