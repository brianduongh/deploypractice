/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('postings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
			autoIncrement: true
    },
		posting_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    posting_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    posting_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    posting_tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    posting_complete: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    posting_completion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    posting_completion_deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    posting_owner: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'postings',
		timestamps: false
  });
};
