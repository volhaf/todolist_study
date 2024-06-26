import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string) => void
}

export function Todolist ( {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus }: TodolistPropsType ) {

    const [taskInput, setTaskInput] = useState('')

//function
    const addTaskHandler = () => {
        addTask(taskInput)
        setTaskInput('')
    }

    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskInput(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
            addTaskHandler()}
    }

    const changeFilterHandler = (filter: FilterType) => {
        changeFilter(filter)
    }

    // const addCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = event.currentTarget.checked;
    //     changeTaskStatus (task.id, newStatusValue)
    // }


    return (
        <div className="todolist">
                <h3>{title}</h3>
            <div>
                <input value={taskInput}
                       onChange={changeEventHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'}
                        OnClickHandler={addTaskHandler}

                />
            </div>

            {tasks.length === 0 ? (
                <p>no tasks</p>
                ):(
                    <ul>
                        {tasks.map(t => {
                            return (
                                <li key={t.id}>
                                    <input
                                        type='checkbox'
                                        checked={t.isDone}
                                        onChange={()=>changeTaskStatus(t.id)}
                                    />
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
                <Button title= {"All"} OnClickHandler={()=>{changeFilterHandler('all')}}/>
                <Button title= {"Active"} OnClickHandler={()=>{changeFilterHandler('active')}}/>
                <Button title= {"Completed"} OnClickHandler={()=>{changeFilterHandler('completed')}}/>
            </div>

        </div>

    )

}
