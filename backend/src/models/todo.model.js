import { DataTypes } from 'sequelize';

const Todo = (sequelize) => {

  const TodoDefinition = sequelize.define(
    'Todo',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:  DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },

    },
    { timestamps: false }
  );

  TodoDefinition.associate = (models) => {
    TodoDefinition.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  };


  return TodoDefinition;
};


export default Todo;
