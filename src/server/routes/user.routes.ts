import * as express from "express";
import {
  createUser,
  deleteUser,
  findUserById,
  getUsers,
  updateUser,
} from "../handlers/user.handler";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", findUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
