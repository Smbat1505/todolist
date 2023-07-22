import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItenForm";

export type FilterValueType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValueType;
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App(): JSX.Element {

    let todoListId1 = v1();
    let todoListId2 = v1();
    const [todoList, setTodoList] = useState<Array<TodoListType>>(
        [
            {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todoListId2, title: 'What to buy', filter: 'all'},

        ]
    );
    let [tasks, setTasks] = useState<TaskStateType>(
        {
            [todoListId1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'REACT', isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: 'TS', isDone: true},
                {id: v1(), title: 'Rest API', isDone: false},
            ]
        }
    );

    const removeTask = (id: string, todoID: string) => {
        //
        // let todolistTasks = tasks[todoID];
        //
        // tasks[todoID] = todolistTasks.filter(task => task.id !== id)
        // setTasks({...tasks})
        setTasks({...tasks, [todoID]: tasks[todoID].filter(el => el.id !== id)})

    }
    const changeFilter = (todoId: string, value: FilterValueType) => {

        const updatedTodoList = todoList.map((todo) =>
            todo.id === todoId ? {...todo, filter: value} : todo
        );

        setTodoList(updatedTodoList);

    }
    const addTask = (todoId: string, item: string) => {

        const newTask = {id: v1(), title: item, isDone: false};
        // const updatedTodoListTasks = [newTask, ...tasks[todoId]];
        //
        // const updatedTasks = {
        //     ...tasks,
        //     [todoId]: updatedTodoListTasks
        // };
        //
        // setTasks(updatedTasks);

        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})

    }
    const changeTaskStatus = (todoID: string, id: string, isDone: boolean) => {
        // setTasks(tasks.map((task => task.id == id ? {...task, isDone} : task)))  //В выражении (task.id === id ? { ...task, isDone } : task), скобки окружают тернарный оператор. Они позволяют явно указать, что оператор должен быть вычислен сначала, а результат должен быть возвращен в качестве значения для метода map.

        // const updatedTasks = {
        //     ...tasks,
        //     [todoID]: tasks[id].map((task) =>
        //         task.id === id ? {...task, isDone} : task
        //     )
        // };
        // setTasks(updatedTasks);
        // console.log(updatedTasks)

        setTasks({...tasks, [todoID]: tasks[todoID].map(task => task.id === id ? {...task, isDone} : task)})


    }
    const removeTodoList = (id: string) => {
        //  Let's add to the state a list of todoLists whose id is not equal to the one that needs to be deleted
        setTodoList(todoList.filter(t => t.id !== id))
        // Let`s remove yhe tasks for this TodoList from the second state, where we store the tasks separately
        delete tasks[id]
        // We set a copy of the object in the state so that the REACT reacts with a redraw
        setTasks({...tasks})
    }

    const addTodoList = (newTitle: string) => {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {id: newTodoListID, title: newTitle, filter: 'all'};
        setTodoList([newTodoList, ...todoList]);
        setTasks({...tasks, [newTodoListID]: []})
    }

    const upDateTitle = (todoListID: string, taskID: string, updateTitle: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: updateTitle} : el)
        })
    }

    return (
        <div className="App">
            <AddItemForm placeholder={'Enter name of TodoList'} callBack={addTodoList}/>
            <div>
                {todoList.map(todo => {

                    let allTodoListTasks = tasks[todo.id];
                    let taskForTodoList = allTodoListTasks;
                    if (todo.filter === 'active') {
                        taskForTodoList = allTodoListTasks.filter(task => !task.isDone)
                    }
                    if (todo.filter === 'completed') {
                        taskForTodoList = allTodoListTasks.filter(task => task.isDone)
                    }

                    return (
                        <TodoList
                            key={todo.id}
                            todolistID={todo.id}
                            title={todo.title}
                            tasks={taskForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={todo.filter}
                            removeTodoList={removeTodoList}
                            upDateTitle={upDateTitle}
                        />


                    )
                })}
            </div>
        </div>
    );
}

export default App;

// CRUD
// C - Create (add task, todolist)
// R - Read (map)
// U - Update (check bocks, input)
// D - Delete (tasks)

// CREATE - ADD TODOLIST => const [title, setTitle] = useState('');
//  Create создает с нуля

// ------------------------------------------------------------------

// UPDATE - ............ => const [title, setTitle] = useState(old title);
// Update создает из хлама(старых значений)


