import { createpost, getpost, getpostUser, getPostById, updatePost,removePost } from "../controllers/post.crontoller";

const postRoutes = app => {
    app.post("/post", createpost);
    app.get("/post", getpost);
    app.get("/post/:id", getpostUser);
    app.get("/postu/:id", getPostById);
    app.put("/post/:id", updatePost);
    app.delete("/post/:id", removePost);
}

export default postRoutes;