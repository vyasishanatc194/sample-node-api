const { encryptPassword } = require('../../encryption')

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LegalName: { type: DataTypes.STRING(60), allowNull: true },
    Type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.Password = encryptPassword(user.Password)
      }
    },
    freezeTableName: true,
    timestamps: true,
  })

  return User
}
