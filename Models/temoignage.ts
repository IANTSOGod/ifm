import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { Publication } from "./publication";

@Table({
  tableName: "temoignage",
  timestamps: false,
})
export class Temoignage extends Model<Temoignage> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  tem_id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  corps!: string;

  @Column({
    type: DataType.NOW,
    allowNull: false,
  })
  date!: Date;
  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  user_id!: number;

  @ForeignKey(() => Publication)
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
