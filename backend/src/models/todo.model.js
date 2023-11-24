import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Todo = sequelize.define('Todo', {

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
  }

});

export default Todo;
