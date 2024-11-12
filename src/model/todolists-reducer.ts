import { v1 } from "uuid"
import { TodolistType } from "../App"



export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}


type ActionType = RemoveTodolistActionType | AddTodolistActionType

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType>=> {
switch (action.type) {
    case "REMOVE-TODOLIST":
        return todolists.filter(tl => tl.id !== action.payload.todolistId)
    case "ADD-TODOLIST":
        let newtodolist: TodolistType = {
			id: action.payload.todolistId,
			filter: 'all',
			title: action.payload.title
		}
        return [ ...todolists, newtodolist]
    default:
        return todolists;
}
} 


