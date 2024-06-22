import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  modelName: 'User',
  timestamps: false
})
export class User extends Model<User> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.INTEGER)
  age: number;

  @Column(DataType.STRING)
  nationality: string;
}
