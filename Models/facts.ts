import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";
import { Image } from "./image";

@Table({
  tableName: "facts",
  timestamps: false,
})
export class Facts extends Model<Facts> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  fact_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_user!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  libelle?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  fact_date!: Date;

  @ForeignKey(() => Image)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  image_id?: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  zone?: string;
}
