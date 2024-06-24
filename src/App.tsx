import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskType ={
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
const [tasks, setTasks] = useState<TaskType[]>(
    [
        {id: 1, title: 'cheese', isDone: true},
        {id: 2, title: 'milk', isDone: true},
        {id: 3, title: 'bread', isDone: true},
    ]
);



    //function

   function removeTask (taskId: number) {
        const newTasks = tasks.filter (t => t.id !== taskId)
       setTasks (newTasks);
    }

  return (
    <div className="App">
        <Todolist
            title ="shopping list"
            tasks={tasks}
            removeTask={removeTask}
        />
    </div>
  );
}

export default App;
