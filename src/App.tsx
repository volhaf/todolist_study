import { AppBar, Box, Button, Container, createTheme, CssBaseline, IconButton, Paper, ThemeProvider, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AddItemForm } from './components/AddItemForm';
import './App.css';
import { Todolist } from "./Todolist";
import {useReducer, useState} from "react";
import { v1 } from "uuid";
import Grid from '@mui/material/Grid2';
import { MenuButton } from './components/MenuButton';
import { deepPurple } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import {
	AddTodolistAC,
	ChangeTodolistFilterAC,
	ChangeTodolistTitleAC, RemoveTodolistAC,
	todolistsReducer
} from "./model/todolists-reducer";


//TYPE 
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}
// END TYPE 


function App() {

	// Todolist STATE 
	let todolistID1 = v1()
	let todolistID2 = v1()

	// let [todolists, setTodolists] = useState<TodolistType[]>([
	// 	{ id: todolistID1, title: 'What to learn', filter: 'all' },
	// 	{ id: todolistID2, title: 'What to buy', filter: 'all' },
	// ])
	// Todolist STATE END

const [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
	{ id: todolistID1, title: 'What to learn', filter: 'all' },
	{ id: todolistID2, title: 'What to buy', filter: 'all' },
])


	// TASKS STATE 
	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})
	// TASKS STATE END 



	// FUNCTION TODOLIST

	function addTodoList(title: string) {
		const todolistId = v1();
		dispatchTodolist(AddTodolistAC(title, todolistId))
		// в dispatch передаем action, сформированный в AddTodolistAC
		setTasks({...tasks, [todolistId]: []})
	}

	function changeFilter(filter: FilterValuesType, todolistId: string) {
		dispatchTodolist(ChangeTodolistFilterAC(todolistId, filter))
	}

	function changeTodolistTitle(newTitle: string, todolistId: string) {
		const action = ChangeTodolistTitleAC(newTitle , todolistId);
		dispatchTodolist(action);
	}

	function removeTodolist(todolistId: string) {
		dispatchTodolist(RemoveTodolistAC(todolistId))
		delete tasks[todolistId]
		setTasks({ ...tasks })

	}


	// FUNCTION TODOLIST END



	// FUNCTION TASK
	function removeTask(taskId: string, todolistId: string) {
		const newTodolistTasks = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) }
		setTasks(newTodolistTasks)
	}
	function addTask(title: string, todolistId: string) {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTodolistTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
		setTasks(newTodolistTasks)
	}
	function changeTaskStatus(taskId: string, taskStatus: boolean, todolistId: string) {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: taskStatus } : t)
		}
		setTasks(newTodolistTasks)
	}
	function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
		let todolistsTasks = tasks[todolistId];
		let task = todolistsTasks.find(t => t.id === taskId);

		if (task) {
			task.title = newTitle;
			setTasks({ ...tasks })
		}
	}
	// FUNCTION TASK END

	const [mode, setMode] = useState(false)
	const theme = createTheme({

		palette: {
			primary: {
				main: '#3949ab',
			},
			secondary: deepPurple,
			mode: mode ? "dark" : "light"
		},
	})


	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							TODOLIST
						</Typography>
						<Box>
							<MenuButton color="inherit" >Login</MenuButton>
							<MenuButton color="inherit" >Logout</MenuButton>
							<MenuButton color="inherit" >FAQ</MenuButton>
						</Box>
						<Switch onChange={() => setMode(!mode)} />
					</Toolbar>
				</AppBar>
				<Grid container spacing={10}>
					<Grid offset={{ md: 0.5 }}>
						<Paper elevation={6} style={{ padding: '16px' }}>
							<AddItemForm addItem={addTodoList} />
						</Paper>
					</Grid>

					<Grid spacing={2} offset={"auto"} size={12} container direction={"row"} justifyContent="center" >
						{todolists.map((tl) => {

							const allTodolistTasks = tasks[tl.id]
							let tasksForTodolist = allTodolistTasks

							if (tl.filter === 'active') {
								tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
							}

							if (tl.filter === 'completed') {
								tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
							}
							return <Grid container>
								<Paper elevation={6} style={{ padding: '16px' }}>
									<Todolist
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
										changeTodolistTitle={changeTodolistTitle} />
								</Paper>
							</Grid>
						})}
					</Grid>
				</Grid>
			</ThemeProvider>

		</div>
	);
}

export default App;
