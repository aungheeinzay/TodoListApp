import React from 'react';
import type { todo } from './types/todo';

const Todo = ({title,_id} :todo) => {
    return (
        <section className='w-full'>
           <div key={_id}>
             <div>{title}</div>
            <button>delete</button>
            <button>update</button>
           </div>
        </section>
    )
}

export default Todo;
