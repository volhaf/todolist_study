import React from 'react';
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
}

export function Todolist ( {title, tasks}: TodolistPropsType) {

    return (
        <div className="todolist">
                <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>no tasks</p>
                ):(
                    <ul>
                        {tasks.map(t => {
                            return (
                                <li key={t.id}>
                                    <input type='checkbox' checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button title={'x'}/>
                                </li>)
                        })}
                    </ul>)
            }
            <div>
                <Button title= {"All"}/>
                <Button title= {"Active"}/>
                <Button title= {"Completed"}/>
            </div>

        </div>

    )

}
