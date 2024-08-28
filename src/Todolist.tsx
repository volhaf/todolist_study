import {FilterValuesType, TaskType} from "./App";
import * as React from "react";
import {ChangeEvent} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "./TodoList.styles";




type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	removeTodoList: (todolistId: string) => void
	filter: FilterValuesType
	todolistId: string
	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	changeTodoListTitle: (title: string, todolistId: string) => void
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
		removeTodoList,
		todolistId,
		changeTaskTitle,
		changeTodoListTitle
	} = props


	const addTaskCallback = (taskTitle: string) => {
			addTask(taskTitle, todolistId)
	}
const changeTodoListTitleCallback = (newTitle: string) => {
	changeTodoListTitle(newTitle, todolistId)
}


	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter,todolistId)
	}

	return (
		<div>
			<h3>
				<EditableSpan changetitleCallback={changeTodoListTitleCallback} title={title}/>
				<IconButton onClick={()=>removeTodoList(todolistId)} aria-label="delete">
					<DeleteIcon fontSize="small"/>
				</IconButton>
			</h3>


			<AddItemForm addItem = {addTaskCallback}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue,todolistId)
							}

							const changeTaskTitleCallback = (newTitle: string) => {
								changeTaskTitle(task.id,newTitle, todolistId)
							}

							return <ListItem
								key={task.id}
								sx={ {
									p: 0,
									justifyContent: 'space-between',
									opacity: task.isDone ? 0.5 : 1,
								}}
							>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
									<EditableSpan changetitleCallback ={changeTaskTitleCallback} title={task.title}/>
								</div>

								<IconButton onClick={removeTaskHandler} aria-label="delete">
									<DeleteIcon fontSize="small"/>
								</IconButton>
							</ListItem>
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

