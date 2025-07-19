import React, { useEffect } from 'react';
import { fetchTodos } from '../services/todo';
import type { todo } from '../types/todo';

interface NoteProps {
  todos: todo[];
  setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
  setUpdate: React.Dispatch<React.SetStateAction<todo | undefined>>;
}

const Note = ({ todos, setTodos,setUpdate }: NoteProps) => {
  useEffect(() => {
    const getTodo = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, []); // Only run once on mount

  const handleDele = async (id:string)=>{
    const res = await fetch(`${import.meta.env.VITE_API}/todo/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    setTodos(data.todo)
  }

  return (
    <div className='w-full mt-10 flex flex-col gap-2'>
      {todos.map(({ title, _id }) => (
        <div key={_id} className='bg-amber-500 rounded-2xl w-full p-5 grid grid-cols-4'>
          <h2 className='col-span-4 block break-words'>{title}</h2>
          <button onClick={()=>handleDele(_id)} className='bg-white text-black border-2 cursor-pointer col-span-2 w-full py-2 rounded-md'>delete</button>
          <button onClick={()=>setUpdate({
            title,
            _id
          })}
          className='bg-white text-black border-2 cursor-pointer col-span-2 w-full py-2 rounded-md'>update</button>
        </div>
      ))}
    </div>
  );
};

export default Note;