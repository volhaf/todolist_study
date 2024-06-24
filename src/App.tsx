import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


//type

export type TaskType ={
    id: number,
    title: string,
    isDone: boolean,
}

export type FilterType = 'all' | 'active' | 'completed'


 // **********

function App() {

    //state
const [tasks, setTasks] = useState<TaskType[]>(
    [
        {id: 1, title: 'cheese', isDone: true},
        {id: 2, title: 'milk', isDone: true},
        {id: 3, title: 'bread', isDone: false},
    ]
);

const [filter, setFilter] = useState<FilterType>('all');




// **********
    //function
    function removeTask (taskId: number) {
        const newTasks = tasks.filter (t => t.id !== taskId)
       setTasks (newTasks);
    }

    function changeFilter (filter: FilterType) {
        setFilter(filter);
    }

let taskFilter = tasks;

   if (filter === 'active') {
        taskFilter = tasks.filter(t => t.isDone === false)
   }
    if (filter === 'completed') {
          taskFilter = tasks.filter(t => t.isDone === true)
    }


    // **********

  return (
    <div className="App">
        <Todolist
            title ="shopping list"
            tasks={taskFilter}
            removeTask={removeTask}
            changeFilter={changeFilter}
        />
    </div>
  );
}

export default App;
