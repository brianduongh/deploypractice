/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posting_employees', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
			autoIncrement: true
    },
    bid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bids',
        key: 'id'
      }
    },
    posting: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'postings',
        key: 'id'
      }
    },
    employee: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'posting_employees',
		timestamps: false
  });
};
