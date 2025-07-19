import { Request,Response } from "express";
import { Todo } from "../models/todo";

export const todo =async (req : Request,res : Response)=>{
    
   try {
    const {title} = req.body;
     if(!title){
        return res.status(400).json({message:"title is required"})

    }
    await Todo.create({title})
    const todo = await Todo.find().sort({createdAt:-1})
    return res.status(200).json({message:"created a todo",todo})
   } catch (error) {
    console.log(error);
    return res.status(500).json({message:"internal server error"})
   }

}

export const getTodo = async(req:Request,res:Response)=>{
    try {
        const todo = await Todo.find().sort({createdAt:-1})
        return res.status(200).json({todo})
        console.log(todo);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}

export const deleteTodo=async(req:Request,res:Response)=>{
    try{
        const {id} =req.params
        if(!id){
            return res.status(400).json({message:"id is required"})
        }
        await Todo.findByIdAndDelete(id);
        const todo = await Todo.find().sort({createdAt:-1})
        return res.status(200).json({message:"a todo is deleted",todo})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}

export const updateTodo=async(req:Request,res:Response)=>{
    try{
        const {id} =req.params
        const {title}=req.body
        if(!id || !title){
            return res.status(400).json({message:"title is required"})
        }
        await Todo.findByIdAndUpdate(id,{title})
        const todo = await Todo.find().sort({createdAt:-1})
        return res.status(200).json({message:"a todo is updated",todo})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}

