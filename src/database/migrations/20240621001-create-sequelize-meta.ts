'use strict';
import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('SequelizeMeta', {
    name: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataType.STRING(255)
    }
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('SequelizeMeta');
};
