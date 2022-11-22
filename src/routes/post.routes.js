import { createpost } from "../controllers/post.crontoller";

const postRoutes = app => {
    app.post("/post", createpost);
}

export default postRoutes;