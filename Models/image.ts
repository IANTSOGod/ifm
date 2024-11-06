import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Publication } from "./publication";

@Table({
  tableName: "image",
  timestamps: false,
})
export class Image extends Model<Image> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  image_id!: number;

  @Column({
    type: DataType.BLOB,
    allowNull: false,
  })
  image!: Buffer;

  @ForeignKey(() => Publication)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  pub_id?: number;
}
