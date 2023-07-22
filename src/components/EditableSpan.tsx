import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    oldTitle: string;
    callBack: (updateTitle: string) => void;

}
export const EditableSpan: React.FC<EditableSpanType> = ({oldTitle, callBack}) => {

    const [updateTitle, setUpdateTitle] = useState<string>(oldTitle);
    const [edit, setEdit] = useState<boolean>(false);
    const onChangeHandlers = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value);
    };
    const addTasks = () => {
        callBack(updateTitle)
    }

    function editHandler() {
        setEdit(!edit);
        if (edit) addTasks()

    }

    return (
        edit ? <input onChange={onChangeHandlers} value={updateTitle} onBlur={editHandler} autoFocus/> :
            <span onDoubleClick={editHandler}>{oldTitle}</span>
        //     почему работает без {} ?  => только если нету верстки!!!
    )
}

// Render это сравнение виртуальных домов