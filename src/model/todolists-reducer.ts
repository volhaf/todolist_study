import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodoListType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType




export const todolistsReducer = (state = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodoList: TodoListType = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [...state,newTodoList] // логика по добавлению тудулиста
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map (el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            const todolistId = action.payload.id
            return state.map(el => el.id === todolistId? {...el, filter: action.payload.filter}: el)
        }
        default:
            return state


    }
}

export const removeTodolistAC=(id: string)=> {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const
}

export const addTodolistAC=(title: string)=> {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        },
    } as const
}

export const changeTodolistTitleAC=(id: string, title:string)=> {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        },
    } as const
}

