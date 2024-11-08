import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user";
import { Notification } from "./notification";

@Table({
  tableName: "reaction", 
  timestamps: false, 
})
export class Lecture extends Model<Lecture> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  lect_id!: number;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  user_id!: number;

  @ForeignKey(()=>Notification)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  notif_id!: number;

  @BelongsTo(() => User)
  user!: User;
  @BelongsTo(() => Notification)
  notif!: Notification;
}
