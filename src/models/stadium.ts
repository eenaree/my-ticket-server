import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Team from './team';

export default class Stadium extends Model<
  InferAttributes<Stadium>,
  InferCreationAttributes<Stadium>
> {
  declare id: CreationOptional<number>;
  declare stadium: string;
  declare TeamId: ForeignKey<Team['id']>;

  static initialize(sequelize: Sequelize) {
    return Stadium.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        stadium: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'stadiums',
        timestamps: false,
        charset: 'utf8',
      }
    );
  }
}
