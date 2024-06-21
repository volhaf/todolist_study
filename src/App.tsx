import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {


  return (
    <div className="App">
        <Todolist title ="shopping list"/>
        <Todolist title ="shopping list2"/>
    </div>
  );
}

export default App;
