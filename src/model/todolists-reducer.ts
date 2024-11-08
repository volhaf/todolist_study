import { TodolistType } from "../App"



export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
        todolistId: string
    }
}

export const todolistsReducer = (todolists: Array<TodolistType>, action: RemoveTodolistActionType): Array<TodolistType>=> {
switch (action.type) {
    case "REMOVE-TODOLIST":
        return todolists.filter(tl => tl.id !== action.payload.todolistId)

    default:
        return todolists;
}
} 


