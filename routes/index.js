const todosController = require("../controller/todos");
const todosItemsController = require("../controller/todoitem");
const routesController = require("../controller/routes");

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      message: "Create Your Own Todo Lists API",
    });
  });
  app.post("/api/todos", todosController.create);
  app.get("/api/todos", todosController.list);
  app.delete("/api/todos/:todoId", todosController.destroy);
  app.put("/api/todos/:todoId/items", todosController.updateItem);

  app.post("/api/todos/:todoId/items", todosItemsController.create);
  app.put("/api/todos/:todoId/items/:todoItem", todosItemsController.update);
  app.delete(
    "/api/todos/:todoId/items/:todoItem",
    todosItemsController.destroy
  );

  app.post("/api/router", routesController.create);
  app.get("/api/router", routesController.list);
};
