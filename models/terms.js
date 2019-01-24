/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('terms', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
			autoIncrement: true
    },
    currently_working: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    paid_for: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    term_summery: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    posting_employee: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'posting_employees',
        key: 'id'
      }
    }
  }, {
    tableName: 'terms',
		timestamps: false
  });
};
