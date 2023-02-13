module.exports = function (sequelize, DataTypes) {
    const SourceFile = sequelize.define('SourceFiles', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        BureauID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bureaus', // 'users' refers to table name
                key: 'ID', // 'id' refers to column name in fathers table
            }
        },
        FileName: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        File: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        freezeTableName: true,
        timestamps: true,
    })

    return SourceFile
}
