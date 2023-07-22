import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export const todolistReducer = (state: Array<TodoListType>, action: TodolistReducer) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            // deleted
            // setTodoList(todoList.filter(t => t.id !== id))
            // // Let`s remove yhe tasks for this TodoList from the second state, where we store the tasks separately
            // delete tasks[id]
            // // We set a copy of the object in the state so that the REACT reacts with a redraw
            // setTasks({...tasks})
            return state.filter(el => el.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            const newTodoList: TodoListType = {
                id: action.payload.newTodoListID,
                title: action.payload.title,
                filter: 'all'
            };
            // setTodoList([newTodoList, ...todoList]);
            // setTasks({...tasks, [newTodoListID]: []})

            return [...state, newTodoList]
        }

        case "CHANGE-TODOLIST-TITLE": {
            // setTasks({
            //     ...tasks,
            //     [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: updateTitle} : el)
            // })
            return state.map(todo => todo.id === action.payload.todoID ? {...todo, title: action.payload.title} : todo)

        }
        case "CHANGE-TODOLIST-FILTER": {
            // const updatedTodoList = todoList.map((todo) =>
            //     todo.id === todoId ? {...todo, filter: value} : todo
            // );
            //
            // setTodoList(updatedTodoList);
            return state.map(todo => todo.id === action.payload.todoId ? {...todo, filter: action.payload.value} : todo)
        }


        default: {
            return state
        }
    }
}

type TodolistReducer = AddTodolistACType | RemoveTodolistACType | ChangeTodolistTitleACType | changeFilterACType;


type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}


type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodoListID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodoListID

        }
    } as const
}


type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (todoID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoID,
            title
        }

    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoId: string, value: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoId,
            value
        }

    } as const
}