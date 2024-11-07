import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user";
import { Publication } from "./publication";

@Table({
  tableName: "reaction", 
  timestamps: false, 
})
export class Reaction extends Model<Reaction> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  react_id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    unique:true
  })
  type!: string;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  user_id!: number;

  @ForeignKey(()=>Publication)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  pub_id!: number;

  @BelongsTo(() => User)
  user!: User;
  @BelongsTo(() => Publication)
  pub!: Publication;
}
