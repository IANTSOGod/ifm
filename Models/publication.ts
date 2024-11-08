import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user";
import { Image } from "./image";
import { Reaction } from "./reaction";
import { Temoignage } from "./temoignage";

@Table({
  tableName: "publication",
  timestamps: false,
})
export class Publication extends Model<Publication> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  pub_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  titre?: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  zone?: string;

  @BelongsTo(() => User)
  user!: User;
  @HasMany(() => Image)
  images!: Image[];
  @HasMany(() => Reaction)
  reaction!: Reaction;
  @HasMany(() => Temoignage)
  temoignage!: Temoignage;
}
