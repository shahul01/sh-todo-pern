import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import todoRoutes from "./todo.routes.js";
import authToken from "../middleware/authMiddleware.js";


/**
 *
 * @param {Express} app
 */
export function initRoutes(app) {

  app.use('/test', (req, res) => {
    res.json({"message": "Backend running"});
  });

  app.use('/auth', authRoutes);

  app.use("/users", authToken, userRoutes);

  app.use("/todos", authToken, todoRoutes);

};
