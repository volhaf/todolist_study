import './App.css';
import {Todolist} from "./Todolist";
import {useContext, useState} from "react";
import {v1, v4} from "uuid";

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
				filter={tl.filter}/>
		)
	})


	return (
		<div className="App">
			{todoListComponents}
		</div>
	)
}

export default App;
