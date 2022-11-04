import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default class SeasonTickets extends Model<
  InferAttributes<SeasonTickets>,
  InferCreationAttributes<SeasonTickets>
> {
  declare SeasonId: number;
  declare TicketId: number;

  static initialize(sequelize: Sequelize) {
    return SeasonTickets.init(
      {
        SeasonId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        TicketId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        tableName: 'season_tickets',
        sequelize,
        charset: 'utf8',
        timestamps: false,
      }
    );
  }
}
