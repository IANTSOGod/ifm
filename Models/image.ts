import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
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
    type: DataType.STRING(255),
    allowNull: false,
  })
  image!: string;

  @ForeignKey(() => Publication)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  pub_id?: number;

  @BelongsTo(() => Publication)
  publication!: Publication;
}
