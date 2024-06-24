import React from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterType) => void
}

export function Todolist ( {title, tasks, removeTask, changeFilter}: TodolistPropsType) {

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
                                    <Button
                                        title={'x'}
                                        OnClickHandler={()=> removeTask(t.id)}
                                    />
                                </li>)
                        })}
                    </ul>)
            }
            <div>
                <Button title= {"All"} OnClickHandler={()=>{changeFilter('all')}}/>
                <Button title= {"Active"} OnClickHandler={()=>{changeFilter('active')}}/>
                <Button title= {"Completed"} OnClickHandler={()=>{changeFilter('completed')}}/>
            </div>

        </div>

    )

}
