import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

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
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: true
      }

    },
    { timestamps: false }

  );

  UserDefinition.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, user.salt);
  });

  UserDefinition.associate = (models) => {
    UserDefinition.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos'
    })
  };


  return UserDefinition;
};


export default User;
