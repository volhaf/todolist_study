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
	[todolistId: string] : Array<TaskType>
}

type ThemeMode ='dark' | 'light'

function App() {

	//BLL
	const todolistId_1 = v1()
	const todolistId_2 = v1()

	const [todolists, setTodolists] = useState<Array<TodoListType>>([
		{id: todolistId_1, title: "what to lern", filter: 'all' },
		{id: todolistId_2, title: "what to bye", filter: 'all'},
	])

	const [tasks, setTasks] = useState<TasksStateType> ({
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
		setTasks({...tasks,
			[todolistId] : tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
		})}
	const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
		setTasks({...tasks,
			[todolistId] : tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
		})
	}
	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))}

	const changeTodoListTitle = (title: string,  todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
	}

	const removeTodoList = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId))
	}

const addTodolist= (title: string)=> {
		const todolistId = v1()
		const newTodo: TodoListType = {
			id: todolistId,
			title: title,
			filter: 'all'
		}
		const nextState: Array<TodoListType> =[...todolists, newTodo]
	setTodolists(nextState)
	setTasks({...tasks, [todolistId]: []})

}


	const todoListComponents: Array<JSX.Element> = todolists.map(tl => {

		let tasksForTodolist = tasks[tl.id]
		if (tl.filter === 'active') {
			tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)}
		if (tl.filter === 'completed') {
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone)}

		return (
			<Grid item sx={{p: '30px'}}>
				<Paper elevation={5} sx={{p: '30px'}}>
					<Todolist
						title={tl.title}
						tasks={tasksForTodolist}
						removeTodoList={removeTodoList}
						todolistId={tl.id}
						key={tl.id}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
						changeTaskTitle={changeTaskTitle}
						changeTodoListTitle={changeTodoListTitle}
					/>
				</Paper>
			</Grid>
		)
	})
const [themeMode, setThemeMode] = useState<ThemeMode>('light')
	const theme: Theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#e66666'
			},
			secondary: {
				main: '#75dffd'
			}
		}
	});


const changeModeHandler = () => {
	setThemeMode(themeMode === 'light' ? 'dark': 'light')
}

	return (
		<div className="App">

			<ThemeProvider theme={theme}>
				<Container fixed>
					<ButtonAppBar onChange={changeModeHandler}/>
					<Grid container sx={{ml: '60px'}}>
						<AddItemForm addItem = {addTodolist}/>
					</Grid>
					<Grid container>
						{todoListComponents}
					</Grid>
				</Container>
				<CssBaseline/>
			</ThemeProvider>
		</div>
	)
}


export default App;
