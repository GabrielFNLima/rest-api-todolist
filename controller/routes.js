const Router = require("../models").Router;
const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  create(req, res) {
    return Router.create({
      route: req.body.router,
    })
      .then((r) => {
        res.status(201).send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    // res.send(req.body.router);
  },

  list(req, res) {
    return Router.findAll({
      include: [
        {
          model: Todo,
          as: "todo",
          include: [
            {
              model: TodoItem,
              as: "todoItems",
            },
          ],
        },
      ],
    })
      .then((routes) => res.status(200).send(routes))
      .catch((error) => res.status(400).send(error));
  },
};
