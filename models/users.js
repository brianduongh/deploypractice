/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
			autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
		password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    tableName: 'users',
		timestamps: false
  });
};
