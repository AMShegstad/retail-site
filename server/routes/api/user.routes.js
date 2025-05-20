import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} from '../../controllers/usersController.js';

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

export default router;