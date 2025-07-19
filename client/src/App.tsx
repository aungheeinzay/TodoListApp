
import Form from './Form';
import Note from './components/note';
import { useState } from 'react';
import type { todo } from './types/todo';
const App = () => {
  const [todos,setTodos] = useState<todo[]>([])
  const [update,setUpdate] =useState<todo>()

  return (
    <div className='h-screen bg-gray-700 flex flex-col pt-10 items-center max-w-6/12 mx-auto px-2'>
      <Form setTodos={setTodos} update={update} setUpdate={setUpdate}/>
      <Note todos={todos} setTodos={setTodos} setUpdate={setUpdate}/>
      <section>
        
      </section>
    </div>
  );
}

export default App;
