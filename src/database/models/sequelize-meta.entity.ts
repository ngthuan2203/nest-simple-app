import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({
  tableName: 'SequelizeMeta',
  modelName: 'SequelizeMeta',
  timestamps: false
})
export class SequelizeMeta extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  name: string;
}
