import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    filter: FilterType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, IsDone: boolean) => void

}

export function Todolist({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter
                         }: TodolistPropsType) {

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ? tasks.map((t: TaskType) => {
            return (
                <li key={t.id}>
                    <input
                        type='checkbox'
                        checked={t.isDone}
                        onChange={(event) => changeTaskStatus(t.id, event.currentTarget.checked)}
                    />
                    <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
                    <Button
                        title={'x'}
                        OnClickHandler={() => removeTask(t.id)}
                    />
                </li>
            )
        }) : <p>no tasks</p>



    const [taskInput, setTaskInput] = useState('')
    const [taskInputError, setTaskInputError] = useState<string | null>(null)

//function
    const addTaskHandler = () => {
        const trimmedTitle = taskInput.trim()
        if (trimmedTitle) {
            addTask(taskInput)
        } else {
            setTaskInputError('Title is required')
        }

        setTaskInput('')
    }

    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        taskInputError && setTaskInputError(null) // можно не проверять ошибку, потому что уже пришел null
        setTaskInput(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterHandler = (filter: FilterType) => {
        changeFilter(filter)
    }

    const userTaskEmptyError = taskInputError && <div style={{color: 'red'}}>{taskInputError}</div>
    const userTasklengthWarning = taskInput.length > 10 && <div>recomendate task title 10 ch</div>


    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={taskInput}
                       onChange={changeEventHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                       className={taskInputError ? 'error' : ''}
                />
                <Button title={'+'}
                        OnClickHandler={addTaskHandler}
                        disabled={!Boolean(taskInput)}
                />
                {userTaskEmptyError}
                {userTasklengthWarning}
            </div>
            <ul>{tasksElements}</ul>



            <div>
                <Button title={"All"}
                    OnClickHandler={() => {
                        changeFilterHandler('all')
                    }}
                    buttonColor={filter === "all" ? "active" : ""}

                />
                <Button
                    title={"Active"}
                    OnClickHandler={() => {
                        changeFilterHandler('active')
                    }}
                    buttonColor={filter === "active" ? "active" : ""}
                />
                <Button
                    title={"Completed"}
                    OnClickHandler={() => {
                        changeFilterHandler('completed')
                    }}
                    buttonColor={filter === "completed" ? "active" : ""}

                />
            </div>

        </div>

    )

}
