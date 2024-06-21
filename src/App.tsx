import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskType ={
    id: number,
    title: string,
    isDone: boolean,
}

function App() {

    let tasks= [
        {id: 1, title: 'cheese', isDone: true},
        {id: 2, title: 'milk', isDone: true},
        {id: 3, title: 'bread', isDone: true},
        {id: 4, title: 'bread', isDone: true},
        {id: 5, title: 'bread', isDone: true},
        {id: 6, title: 'bread', isDone: true},
    ]
    let tasks2= [
        {id: 1, title: 'flowers', isDone: true},
        {id: 2, title: 'chair', isDone: true},
        {id: 3, title: 'mug', isDone: true},
    ]

  return (
    <div className="App">
        <Todolist title ="shopping list" tasks={tasks}/>
        <Todolist title ="shopping list2" tasks={tasks2}/>
    </div>
  );
}

export default App;
