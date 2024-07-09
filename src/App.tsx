import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type FilterType = 'all' | 'active' | 'completed';

function App() {
const [tasks, setTasks] = useState<TaskType[]>(
    [
        {id: v1(), title: 'cheese', isDone: true},
        {id: v1(), title: 'milk', isDone: true},
        {id: v1(), title: 'bread', isDone: false},]
);
const [filter, setFilter] = useState<FilterType>('all');

    //function
    function addTask (title: string) {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newList = [newTask,...tasks]
        setTasks(newList)
    }
    function removeTask (taskId: string) {
        const nextState: Array<TaskType> = tasks.filter (t => t.id !== taskId) // new array
       setTasks (nextState);
    }
    function changeFilter (filter: FilterType) {
        setFilter(filter);
    }

    function changeTaskStatus (taskId: string, newIsDoneValue: boolean) {
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks(nextState)

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
            filter={filter}
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
