module.exports = function (sequelize, DataTypes) {
  const Bureau = sequelize.define('bureaus', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // 'users' refers to table name
        key: 'ID', // 'id' refers to column name in fathers table
      }
    },
    PrimaryContact: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PrimaryContactPhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PrimaryContactMobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Zip: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    EmployerCount:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    freezeTableName: true,
    timestamps: true,
  })

  return Bureau
}
