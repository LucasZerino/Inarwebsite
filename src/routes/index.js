import postRoutes from "./post.routes";
import userRoutes from "./user.routes";

const routes = app => {
    userRoutes(app);
    postRoutes(app);
}

export default routes;