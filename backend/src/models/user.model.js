import { DataTypes } from 'sequelize';

const User = (sequelize) => {
  const UserDefinition = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }

    },
    { timestamps: false }

  );

  UserDefinition.associate = (models) => {
    UserDefinition.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos'
    })
  };


  return UserDefinition;
};


export default User;
