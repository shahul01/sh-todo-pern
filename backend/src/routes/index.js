import todoRoutes from "./todo.routes.js";
import userRoutes from "./user.routes.js";


/**
 *
 * @param {Express} app
 */
export function initRoutes(app) {

  app.use("/todos", todoRoutes);

  app.use("/users", userRoutes);

};
