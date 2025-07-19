import type { todo } from "../types/todo"


export const fetchTodos=async():Promise<todo[]>=>{
    const res=await fetch(import.meta.env.VITE_API)
    const {todo} = await res.json()
    return todo
}

