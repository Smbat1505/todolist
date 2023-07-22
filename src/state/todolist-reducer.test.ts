import {addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";


test('Correct todolist should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    // const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})
    const endState = todolistReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('Correct todolist should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodolistTitle = 'New Todolist';
    const newTodoListID = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    // const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle, newTodoListID))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('Correct todolist should change its name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodolistTitle = 'New Todolist';
    // const newTodoListID = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todoListId2,
        title: newTodolistTitle
    }
    const endState = todolistReducer(startState, changeTodolistAC(action.id, action.title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('Correct todolist should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValueType = 'completed';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todoListId2,
        filter: newFilter
    }
    const endState = todolistReducer(startState, changeFilterAC(todoListId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})