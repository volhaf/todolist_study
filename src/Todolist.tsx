import React from 'react';
import {TaskType} from "./App";

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
                <button>X</button>
            </div>
            <ul>
                {tasks.map (t=> {
                    return (
                        <li>
                            <input type='checkbox' checked={true}/>
                            <span>{t.title}</span>
                            <button>x</button>
                        </li>)
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>

            </div>

        </div>

    )

}
