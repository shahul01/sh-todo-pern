import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import todoRoutes from "./todo.routes.js";


/**
 *
 * @param {Express} app
 */
export function initRoutes(app) {

  app.use('/auth', authRoutes);

  app.use("/users", userRoutes);

  app.use("/todos", todoRoutes);

};
