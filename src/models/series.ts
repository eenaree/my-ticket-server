import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Season from './season';
import Ticket from './ticket';

export default class Series extends Model<
  InferAttributes<Series>,
  InferCreationAttributes<Series>
> {
  declare id: CreationOptional<number>;
  declare series: string;
  declare SeasonId: ForeignKey<Season['id']>;
  declare addTicket: HasManyAddAssociationMixin<Ticket, number>;

  static initialize(sequelize: Sequelize) {
    return Series.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        series: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        charset: 'utf8',
      }
    );
  }
}
