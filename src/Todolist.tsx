import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	changeTaskTitle:  (taskId: string, newTitle: string, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		changeTaskTitle,
		todolistId,
		removeTodolist
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskWrap =(title: string) => {
		addTask(title, todolistId)
	}
	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3>{title}</h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem = {addTaskWrap} />
	
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}
							

							const onChangeTitleHandler = (newValue: string) => {
								changeTaskTitle(task.id, newValue, todolistId)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
								<EditableSpan title ={task.title} onChange= {onChangeTitleHandler}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
						onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
						onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
						onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
