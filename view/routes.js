import express from "express";
import {
  addUserController,
  deleteUserController,
  getUserByIdController,
  getUsersDataController,
  updateUserController,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/get-all-users-data", getUsersDataController);
router.get("/get-one-user-data/:userid", getUserByIdController);
router.post("/add-user", addUserController);
router.put("/update-user/:userid", updateUserController);
router.delete("/delete-user/:userid", deleteUserController);

export default router;
