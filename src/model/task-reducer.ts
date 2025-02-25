import type {TasksStateType} from '../App'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
} from "./todolists-reducer";
import {v1} from "uuid";

const initialState: TasksStateType = {

}

export const tasksReducer = (tasks: TasksStateType = initialState, action: Actions): TasksStateType => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const { todolistId } = action.payload
            return {...tasks, [todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const { todolistId } = action.payload
            delete tasks[todolistId]
            return tasks
        }
        case "REMOVE-TASK": {  // проверить
            const { todolistId, taskId } = action.payload
            return { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) }
        }
        case "ADD-TASK": {  // проверить
            const { todolistId, title } = action.payload
            const newTask = {id: v1(), title: title, isDone: false}
            return { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }

        }
        case "CHANGE-TASK-STATUS": {
            const { todolistId } = action.payload
           return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.taskStatus } : t)
            }
        }
        case "CHANGE-TASK-TITLE" : {
            const { todolistId } = action.payload
            return {...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === action.payload.taskId
                    ? {...t, title: action.payload.newTitle} : t)
            }
        }
        default:
            return tasks
    }
}


export const RemoveTaskAC = (payload: {taskId: string, todolistId: string}) => {
    return {type: 'REMOVE-TASK', payload} as const
}

export const AddTaskAC = (payload: { todolistId: string, title: string }) => {
    return  {type: 'ADD-TASK', payload} as const
}

export const ChangeTaskStatusAC = (payload: {taskId: string, taskStatus: boolean, todolistId: string}) => {
    return {type: "CHANGE-TASK-STATUS", payload} as const
}

export const ChangeTaskTitleAC = (payload: {taskId: string, newTitle: string, todolistId: string}) => {
    return {type: "CHANGE-TASK-TITLE", payload} as const
}

type Actions = RemoveTodolistActionType
    | AddTodolistActionType
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export type AddTaskActionType = ReturnType<typeof AddTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>



