import React, {ChangeEvent, KeyboardEvent, useState, MouseEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItenForm";
import {EditableSpan} from "./components/EditableSpan";
import {CheckBox} from "./components/CheckBox";
import {Button} from "./components/Button";


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type PropsTodoListType = {
    todolistID: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todoID: string) => void;
    changeFilter: (todoId: string, value: FilterValueType) => void;
    addTask: (id: string, item: string) => void;
    changeTaskStatus: (todoID: string, taskID: string, isDone: boolean) => void;
    filter: FilterValueType;
    removeTodoList: (id: string) => void;
    upDateTitle: (todoListID: string, taskID: string, updateTitle: string) => void

}

export const TodoList: React.FC<PropsTodoListType> = (
    {
        todolistID,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        removeTodoList,
        upDateTitle
    }
) => {
    const [item, setItem] = useState('');

    const [error, setError] = useState<string | null>(null);

    // Handlers
    // const onChangeHandlers = (event: ChangeEvent<HTMLInputElement>) => {
    //     setItem(event.currentTarget.value);
    // };
    //
    // const onKeyDownHandlers = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (event.key === 'Enter') {
    //         // addTask();
    //     }
    //
    // };
    const onAllClickHandlers = () => {
        changeFilter(todolistID, 'all')
    }
    const onActiveClickHandlers = () => {
        changeFilter(todolistID, 'active')
    }
    const onCompletedClickHandlers = () => {
        changeFilter(todolistID, 'completed')
    }

    const removeTodo = () => {
        removeTodoList(todolistID)
    }
    // Handlers end


    const taskMap = tasks.map((task) => {
        const onClickRemoveTaskHandler = () => removeTask(task.id, todolistID);
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked;
            changeTaskStatus(todolistID, task.id, newIsDoneValue);
        }
        const upDateTitleHandler = (updateTitle: string) => {
            upDateTitle(todolistID, task.id, updateTitle)
        }

        const changeStatusHandler = (taskID: string, event: boolean) => changeTaskStatus(todolistID, taskID, event)
        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <CheckBox
                    checkedInput={task.isDone}
                    callBackInput={(event) => {
                        changeStatusHandler(task.id, event)
                    }}
                />
                <EditableSpan oldTitle={task.title} callBack={upDateTitleHandler}/>
                <Button name={'x'} callback={onClickRemoveTaskHandler}/>
            </li>
        )
    });

    const addTaskHandler = (newTitle: string) => {
        addTask(todolistID, newTitle);
    }


    return (
        <div>
            <div>
                <h3>
                    {title}
                    <Button  name={'x'} callback={removeTodo}/>
                </h3>
            </div>
            <AddItemForm placeholder={'Enter name of task'} callBack={addTaskHandler}/>
            <ul>
                {
                    taskMap
                    // tasks.map((task) => {
                    //     const onClickRemoveTaskHandler = () => removeTask(task.id, id);
                    //     const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //         let newIsDoneValue = event.currentTarget.checked;
                    //         changeTaskStatus(id, task.id, newIsDoneValue);
                    //     }
                    //     return (
                    //         <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    //             <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    //             <span>{task.title}</span>
                    //             <button onClick={onClickRemoveTaskHandler}>x
                    //             </button>
                    //         </li>
                    //     )
                    // })
                }
            </ul>
            <div>
                <Button name={'All'} callback={onAllClickHandlers}
                        className={filter === 'all' ? 'active-filter' : 'button-filter'}/>
                <Button name={'Active'} callback={onActiveClickHandlers}
                        className={filter === 'active' ? 'active-filter' : 'button-filter'}/>
                <Button name={'Completed'} callback={onCompletedClickHandlers}
                        className={filter === 'completed' ? 'active-filter' : 'button-filter'}/>
            </div>
        </div>
    )
}