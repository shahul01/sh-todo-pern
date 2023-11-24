import todoRoutes from "./todo.routes.js";


/**
 *
 * @param {Express} app
 */
export function initRoutes(app) {

  app.use("/todos", todoRoutes);

};
