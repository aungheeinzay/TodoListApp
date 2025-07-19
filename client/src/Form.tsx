import React, { useState, type FormEvent,useEffect } from 'react';
import type { todo } from './types/todo';


interface FormProps {
  setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
  setUpdate:React.Dispatch<React.SetStateAction<todo | undefined>>;
  update?: todo;
}

const Form = ({setTodos,update,setUpdate} : FormProps) =>{
    const [title, setTitle] = useState<string>();

    useEffect(() => {
    setTitle(update ? update.title : "");
  }, [update]);

    const handleCreate = async(e:FormEvent)=>{
        e.preventDefault()
        if(!title) return alert("please enter a todo")
            try {
                const res=await fetch(`${import.meta.env.VITE_API}/todo`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({title})
                })
                const data = await res.json()
                console.log(data);
                setTodos(data.todo)
                setTitle('')
            } catch (error) {
                console.log(error);
            }
    }

    const handleUpdate = async(e:FormEvent)=>{
        e.preventDefault()
        if(!title)return alert ("please enter a todo")
        const res = await fetch(`${import.meta.env.VITE_API}/todo/${update?._id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title})})
        const data = await res.json()
        setTodos(data.todo)
        setTitle('')
        setUpdate(undefined)
    }
    return (
        <main className='w-full text-medium '>
            <form onSubmit={update?.title ?handleUpdate : handleCreate} className='flex flex-col items-center gap-5 '>
                <input type="text" placeholder='enter todo...' value={title} className='border-2 rounded-full border-white text-white py-2 ps-2 w-full'
                 onChange={(e)=>setTitle(e.target.value)}/>
                <button type='submit' className='w-full rounded-full bg-white text-black py-2 cursor-pointer'>{update?.title ? "save" : "add"}</button>
            </form>
        </main>
    );
}

export default Form;
