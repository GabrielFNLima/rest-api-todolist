"use strict";
module.exports = (sequelize, DataTypes) => {
  const Router = sequelize.define(
    "Router",
    {
      route: DataTypes.STRING,
    },
    {}
  );
  Router.associate = function (models) {
    // associations can be defined here
    Router.hasMany(models.Todo, {
      as: "todo",
    });
  };
  return Router;
};
