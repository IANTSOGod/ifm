import { Table, Column, Model, DataType} from "sequelize-typescript";

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

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  libelle?: string;
}