import { Table, Column, Model, DataType, HasMany, AllowNull } from "sequelize-typescript";
import { Notification } from "./notification";
import { Lecture } from "./lecture";
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
    allowNull: true,
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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  verif!: boolean;
  
  @HasMany (()=> Notification)
  notification!:Notification;
  @HasMany(()=>Lecture)
  lecture!:Lecture
}
