import { FilterValuesType, TaskType } from "./app/App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from '@mui/material/Button';
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import { Box, Checkbox, IconButton, ListItem, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
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
		changeTodolistTitle(todolistId, newTitle)
	}

	const addTaskWrap = (title: string) => {
		addTask(title, todolistId)
	}
	return (
		<div>
			<div className={"todolist-title-container"}>
				<Typography align="center" variant="h6"> 
					<EditableSpan title={title} onChange={changeTodolistTitleHandler} />
					<IconButton aria-label="delete" onClick={removeTodolistHandler}><Delete/></IconButton>
				</Typography>
			</div>
			<AddItemForm addItem={addTaskWrap} />

			{
				tasks?.length === 0
					? <p>no tasks</p>
					: <Box>
						{tasks?.map((task) => {

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

							return <ListItem
								key={task.id}
								disablePadding
								sx={{
									opacity: task.isDone ? 0.5 : 1 ,
									justifyContent: "space-between"

								}}>
								
								<Box >
								<Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} color="secondary" size="small" />
									<EditableSpan title={task.title} onChange={onChangeTitleHandler} />
								</Box>
								<IconButton size="small" aria-label="delete" onClick={removeTaskHandler}><Delete fontSize="inherit" /></IconButton>

							</ListItem>
						})}
					</Box>
			}
			<Box>
				<Button variant={filter === 'all' ? "contained" : "text"} size="small"

					onClick={() => changeFilterTasksHandler('all')}>All</Button>

				<Button variant={filter === 'active' ? "contained" : "text"} size="small"
					onClick={() => changeFilterTasksHandler('active')}>Active</Button>

				<Button variant={filter === 'completed' ? "contained" : "text"} size="small"
					onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
			</Box>
		</div>
	)
}
