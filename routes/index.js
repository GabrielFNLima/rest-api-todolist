const todosController = require("../controller/todos");
const todosItemsController = require("../controller/todoitem");

module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      message: "Create Your Own Todo Lists API"
    });
  });
  app.post("/api/todos", todosController.create);
  app.get("/api/todos", todosController.list);
  app.delete("/api/todos/:todoId", todosController.destroy);

  app.post("/api/todos/:todoId/items", todosItemsController.create);
};
