import { create, getusers, getuserById, updateUsr, removeUsr } from "../controllers/user.controller";

const userRoutes = app => {
    app.post("/user", create);
    app.get("/user", getusers);
    app.get("/user/:id", getuserById);
    app.put("/user/:id", updateUsr);
    app.delete("/user/:id", removeUsr);
}

export default userRoutes;