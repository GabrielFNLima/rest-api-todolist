const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  create(req, res) {
    return Todo.create({
      title: req.body.title,
      routerId: req.body.routerId,
    })
      .then((todo) => res.status(201).send(todo))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    const { sort = "DESC" } = req.query;
    return Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
      order: [
        ["createdAt", sort.toUpperCase()], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
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
  updateItem(req, res) {
    const todoId = req.params.todoId;
    return Todo.findAll({
      where: { id: todoId },
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    }).then((todos) => {
      const updated = true;
      todos.map((items) => {
        if (items.allComplete) {
          items.update({
            allComplete: false,
          });
        } else {
          items.update({
            allComplete: true,
          });
        }

        items.todoItems.map((item) => {
          TodoItem.findByPk(item.id).then((item) => {
            if (item.complete) {
              item
                .update({
                  complete: false,
                })
                .then(() => {
                  res.status(200).send({
                    message: `All Task '${items.title}' item cleared successfully`,
                  });
                });
            } else {
              item
                .update({
                  complete: true,
                })
                .then(() => {
                  res.status(200).send({
                    message: `All Task '${items.title}' item marked successfully`,
                  });
                });
            }
          });
        });
      });
    });
  },
};
