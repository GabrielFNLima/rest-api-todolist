const TodoItem = require("../models").TodoItem;
const Todo = require("../models").Todo;

module.exports = {
  create(req, res) {
    return TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId,
    })
      .then((todoItem) => res.status(201).send(todoItem))
      .catch((err) => res.status(400).send(err));
  },
  update(req, res) {
    const todoId = req.params.todoId;
    const todoItem = req.params.todoItem;

    return TodoItem.findAll({
      where: {
        id: todoItem,
        todoId,
      },
    })
      .then((todoItem) => {
        todoItem.map((item) => {
          if (item.complete) {
            item
              .update({
                complete: false,
              })
              .then(() =>
                res
                  .status(200)
                  .send({ message: "Task item cleared successfully" })
              );
          } else {
            item
              .update({
                complete: true,
              })
              .then(() =>
                res
                  .status(200)
                  .send({ message: "Task item marked successfully" })
              );
          }
        });
      })
      .catch((err) => res.status(400).send(err));
  },
  destroy(req, res) {
    const todoId = req.params.todoId;
    const todoItem = req.params.todoItem;

    TodoItem.findAll({
      where: {
        id: todoItem,
        todoId,
      },
    }).then((item) => {
      if (item.indexOff < 0) {
        return res.status(404).send({ message: "Item not found" });
      }
      item.map((i) => {
        i.destroy()
          .then(() =>
            res.status(200).send({ message: "Item Removed Successfully" })
          )
          .catch((error) => res.status(400).send(error));
      });
    });
  },
};
