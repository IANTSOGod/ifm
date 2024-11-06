import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "user", 
  timestamps: false, 
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique:true
  })
  username!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  mdp!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  num_phone?: string; 

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  CIN?: string; 
  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  email?: string; 
}
