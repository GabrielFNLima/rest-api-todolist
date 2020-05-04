const Router = require("../models").Router;
const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  create(req, res) {
    const { sort = "DESC" } = req.query;

    return Router.findOrCreate({
      where: { route: req.params.route },
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
      .spread((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    // res.send(req.body.router);
  },

  list(req, res) {
    const { sort = "DESC" } = req.query;

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
      order: [
        ["createdAt", sort.toUpperCase()], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ],
    })
      .then((routes) => res.status(200).send(routes))
      .catch((error) => res.status(400).send(error));
  },
};
