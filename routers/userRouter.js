import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser, addBook } from "../controllers/users.js";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
userRouter.route("/:id/books").post(addBook);

export default userRouter;
