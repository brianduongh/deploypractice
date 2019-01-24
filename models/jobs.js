/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
			autoIncrement: true
    },
    job_hours: {
      type: "DOUBLE",
      allowNull: true
    },
    job_posting: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'postings',
        key: 'id'
      }
    },
    job_employee: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    job_employer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'jobs',
		timestamps: false
  });
};
