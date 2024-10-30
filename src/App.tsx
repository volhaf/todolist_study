import { AddItemForm } from './AddItemForm';
import './App.css';
import {Todolist} from "./Todolist";
import {useContext, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, Theme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
	id: string
	title:string
	filter: FilterValuesType
}

export type TasksStateType = {
	[todolistId: string] : TaskType[]
}

export type ThemeMode ='dark' | 'light'

function App() {

	//BLL
	const todolistId_1 = v1()
	const todolistId_2 = v1()

	const [todolists, setTodolists] = useState<Array<TodoListType>>([
		{id: todolistId_1, title: "what to lern", filter: 'all' },
		{id: todolistId_2, title: "what to bye", filter: 'all'},
	])

	const [tasks, setTasks] = useState ({
		[todolistId_1] : [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistId_2] : [
			{id: v1(), title: 'water', isDone: true},
			{id: v1(), title: 'icecream', isDone: true},
			{id: v1(), title: 'milk', isDone: false},
		]
	})


	const removeTask = (taskId: string, todolistId: string) => {
		setTasks(
			{...tasks,
				[todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
			})
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = {id: v1(), title: title, isDone: false}
		setTasks({...tasks,
			[todolistId] : [...tasks[todolistId], newTask] })
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
		}
		setTasks(newTodolistTasks)
	}


	function changeTaskTitle (taskId: string, newTitle: string, todolistId: string) {
		let todolistsTasks= tasks[todolistId]; 
		let task = todolistsTasks.find(t => t.id === taskId);
		
		if(task) {
			task.title = newTitle; 
			setTasks({... tasks})
		}
	}



	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))}

	const changeTodoListTitle = (title: string,  todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
	}

	const removeTodolist = (todolistId: string) => {
		const newTodolists = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(newTodolists)

		delete tasks[todolistId]
		setTasks({ ...tasks })
	}


	function changeTodolistTitle (todolistId: string, newTitle: string) {
		const newTodolists = todolists.map(tl => (tl.id === todolistId ? { ...tl, newTitle } : tl))
		setTodolists(newTodolists)
	}

	


	function addTodoList (title: string) {
		let todolist: TodolistType = {
			id: v1(),
			filter: 'all',
			title: title
		}
		setTodolists([todolist, ...todolists ]);
		setTasks({
			...tasks,
			[todolist.id]: []
		})

	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodoList}/>

			{todolists.map((tl) => {

				const allTodolistTasks = tasks[tl.id]
				let tasksForTodolist = allTodolistTasks

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return <Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					changeTaskTitle={changeTaskTitle}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					changeTodolistTitle={changeTodolistTitle}
				/>
			})}
		</div>
	)
}








export default App;
