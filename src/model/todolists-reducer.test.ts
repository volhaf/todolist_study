
import { AddTodolistAC,  ChangeTodolistFilterAC,  ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

let todolistId1 = v1()
let todolistId2 = v1()
let startState: TodolistType[] = []

beforeEach( ()=> {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})
 
test('correct todolist should be removed', () => {
const endState = todolistsReducer(startState, RemoveTodolistAC (todolistId1))

expect(endState.length).toBe(1)
expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
const newTitle = 'New Todolist'; 
const endState = todolistsReducer(startState, AddTodolistAC(newTitle, v1()))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
    const  newTitle = 'New Todolist';
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC (newTitle , todolistId2))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter = 'completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC (todolistId2, newFilter))
   
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})