import { Router } from "express";
import { todo,deleteTodo,updateTodo, getTodo} from "../controllers/todo";
import { get } from "mongoose";
const router = Router()

router.post("/todo",todo)
router.get("/",getTodo)
router.delete("/todo/:id",deleteTodo)
router.put("/todo/:id",updateTodo)
export default router;
