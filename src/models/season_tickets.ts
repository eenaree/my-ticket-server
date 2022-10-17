import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default class Season_Tickets extends Model<
  InferAttributes<Season_Tickets>,
  InferCreationAttributes<Season_Tickets>
> {
  static initialize(sequelize: Sequelize) {
    return Season_Tickets.init(
      {},
      {
        sequelize,
        charset: 'utf8',
        timestamps: false,
      }
    );
  }
}
