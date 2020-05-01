"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: {
        type: DataTypes.STRING,
      },
      allComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {}
  );
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
      foreignKey: "todoId",
      as: "todoItems",
    });

    Todo.belongsTo(models.Router, {
      foreignKey: "routerId",
      onDelete: "CASCADE",
    });
  };
  return Todo;
};
