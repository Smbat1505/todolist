import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {v1} from "uuid";
import {Button} from "./Button";


type AddItemFormType = {
    placeholder: string;
    callBack: (newTitle: string) => void;
}
export const AddItemForm: FC<AddItemFormType> = ({callBack, placeholder}) => {
    let [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            callBack(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }

    }
    const onChangeHandlers = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setTitle(value);
        setError(null); // Сброс ошибки при каждом изменении ввода

        const newTitle = event.currentTarget.value;
        const latinAndDigitPattern = /^[ A-Za-z0-9\s,.?!#$&*]*$/; // Разрешаем пробелы и другие символы

        if (latinAndDigitPattern.test(newTitle)) {
            setTitle(newTitle);
            setError(null);
        } else {
            setError('Только латинские буквы и цифры разрешены.');
        }
    };
    const onKeyDownHandlers = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addTask();
        }

        // console.log(event.key)
    };
    const titleMaxLength: number = 25;
    const isTitleLengthToLong: boolean = title.length > titleMaxLength;
    const isAddBtnDisabled: boolean = title.length === 0 || isTitleLengthToLong


    return (
        <div>
            <input
                placeholder={placeholder}
                value={title}
                onChange={onChangeHandlers}
                onKeyUp={onKeyDownHandlers}
                className={error ? 'error' : ''}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button name={'add'} callback={addTask} disabled={isAddBtnDisabled}/>
            {error && <div style={{color: 'red', fontWeight: '700', fontStyle: 'italic'}}
                           className={"error-message"}>{error}</div> || isTitleLengthToLong &&
                <div style={{color: 'red', fontWeight: '700', fontStyle: 'italic'}}>Title is too long, max 25
                    characters</div>}
            {/*{isTitleLengthToLong &&}*/}
        </div>
    )
}