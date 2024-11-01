import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	changeTaskTitle:  (taskId: string, newTitle: string, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (todolistId: string, newTitle: string) => void
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
		removeTodolist,
		changeTodolistTitle
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}
	const changeTodolistTitleHandler = (newTitle: string) => {
		changeTodolistTitle(todolistId, newTitle )
	}

	const addTaskWrap =(title: string) => {
		addTask(title, todolistId)
	}
	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3> <EditableSpan title={title} onChange ={changeTodolistTitleHandler}/></h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem = {addTaskWrap} />
	
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
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
					</List>
			}
			<div>
				<Box sx={filterButtonsContainerSx}>
					<Button size="small" variant={filter === 'all' ? "outlined" :"contained" } onClick={()=> changeFilterTasksHandler('all')} color="primary" >All</Button>
					<Button size="small" variant={filter === 'active' ? "outlined" :"contained" } onClick={()=> changeFilterTasksHandler('active')} color="primary" >Active</Button>
					<Button size="small" variant={filter === 'completed' ? "outlined" :"contained" } onClick={()=> changeFilterTasksHandler('completed')} color="primary" >Completed</Button>
				</Box>
			</div>
		</div>
	)
}

