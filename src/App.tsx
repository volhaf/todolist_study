import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


//type

export type TaskType ={
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterType = 'all' | 'active' | 'completed'


 // **********

function App() {

    //state
const [tasks, setTasks] = useState<TaskType[]>(
    [
        {id: v1(), title: 'cheese', isDone: true},
        {id: v1(), title: 'milk', isDone: true},
        {id: v1(), title: 'bread', isDone: false},
    ]
);

const [filter, setFilter] = useState<FilterType>('all');


// **********
    //function
    function removeTask (taskId: string) {
        const task = tasks.filter (t => t.id !== taskId)
       setTasks (task);
    }

    function changeFilter (filter: FilterType) {
        setFilter(filter);
    }

    const changeTaskStatus = (taskId: string) => {
        const task: TaskType | undefined = tasks.find( t => t.id === taskId)
        if (task) {
            task.isDone = !task.isDone;
            setTasks([...tasks])

        }
    }

let taskFilter = tasks;

   if (filter === 'active') {
        taskFilter = tasks.filter(t => t.isDone === false)
   }
    if (filter === 'completed') {
          taskFilter = tasks.filter(t => t.isDone === true)
    }

    function addTask (title: string) {
       const newTask = {
           id: v1(),
           title: title,
           isDone: false,
       }
        const newList = [...tasks, newTask]
        setTasks(newList)
    }

    // **********

  return (
    <div className="App">
        <Todolist
            title ="shopping list"
            tasks={taskFilter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}

        />
    </div>
  );
}

export default App;
