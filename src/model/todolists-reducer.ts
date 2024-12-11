import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todolistId: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
    todolistId: string,
    filter: FilterValuesType,
    },
}
type ActionType = RemoveTodolistActionType 
| AddTodolistActionType 
| ChangeTodolistActionType 
| ChangeTodolistFilterActionType

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType>=> {
switch (action.type) {
    case "REMOVE-TODOLIST":{
        const {todolistId} = action.payload
        return todolists.filter(tl => tl.id !== todolistId)
    }
    case "ADD-TODOLIST": {
        const {todolistId, title} = action.payload
        let newtodolist: TodolistType = {
			id: todolistId,
			filter: 'all',
			title: title
		}
        return [ ...todolists, newtodolist]
    }
    case 'CHANGE-TODOLIST-TITLE' : {
        const {todolistId, title} = action.payload
        return todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl)
    }
    case 'CHANGE-TODOLIST-FILTER' : {
        const {filter, todolistId} = action.payload
        return todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)
    }
   
        default:
        return todolists;
}
} 


export const RemoveTodolistAC = (todolistId: string) : RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST', 
    payload: {
        todolistId 
    }
})


export const AddTodolistAC = (title: string, todolistId: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    payload: {
        title,
        todolistId
    }
})

export const ChangeTodolistTitleAC = (title: string, todolistId: string,  ) : ChangeTodolistActionType => ({
    type: 'CHANGE-TODOLIST-TITLE', 
    payload: {
        title,
        todolistId,
    }
})


export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType,): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
    todolistId,
    filter
    }
})