import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
	{id: todolistID1, title: 'What to learn', filter: 'all'},
	{id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (todolists: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType>=> {
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



// Actions types

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>


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





// Action creators


export const RemoveTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', 
    payload: {
        todolistId 
    } 
} as const)

export const AddTodolistAC = (title: string, todolistId: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        title,
        todolistId
    } 
}as const)

export const ChangeTodolistTitleAC = (title: string, todolistId: string,  ) : ChangeTodolistActionType => ({
    type: 'CHANGE-TODOLIST-TITLE', 
    payload: {
        title,
        todolistId,
    } 
} as const)

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType,): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
    todolistId,
    filter
    } 
} as const)


