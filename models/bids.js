/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bids', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
			autoIncrement: true
    },
    employee_rate: {
      type: "DOUBLE",
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'This person has nothing important to say :)'
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    tableName: 'bids',
		timestamps: false
  });
};
