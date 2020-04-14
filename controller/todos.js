const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  create(req, res) {
    return Todo.create({
      title: req.body.title,
    })
      .then((todo) => res.status(201).send(todo))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    return Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Todo.findByPk(req.params.todoId)
      .then((todo) => {
        if (!todo) {
          return res.status(400).send({
            message: "Todo List not found",
          });
        }
        todo
          .destroy()
          .then(() =>
            res.status(200).send({ message: "Todo List deleted Successfully" })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
