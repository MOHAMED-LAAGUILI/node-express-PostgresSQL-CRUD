import express from "express";
import { addUserController, deleteUserController, getUsersDataController, updateUserController } from "../controller/user.controller.js";

const router = express.Router()

router.get('/get-all-users-data', getUsersDataController )
router.post('/add-user', addUserController )
router.put('/update-user/:userid', updateUserController )
router.delete('/delete-user/:userid', deleteUserController )

export default router;