import './App.css';
import {Todolist} from "./Todolist";
import {useContext, useState} from "react";
import {v1} from "uuid";

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

type TasksStateType = {
	[todolistId: string] : TaskType[]
}

function App() {

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
		setTasks({...tasks,
			[todolistId] : tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
		})
	}
	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
	}
	const removeTodoList = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId))
	}



	const todoListComponents: Array<JSX.Element> = todolists.map(tl => {
		return (
			<Todolist
				title="What to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
				filter={filter}
			/>
		)
	})

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}



	return (
		<div className="App">
			<todoListComponents/>
		</div>
	);
}

export default App;
