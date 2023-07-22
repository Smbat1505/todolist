import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";


type CheckBoxType = {
    checkedInput: boolean;
    callBackInput: (event: boolean) => void;
}


export const CheckBox: React.FC<CheckBoxType> = ({
                                                     checkedInput,
                                                     callBackInput,
                                                 }) => {
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callBackInput(event.currentTarget.checked)
    }


    return (
        <>
            <input type="checkbox" checked={checkedInput} onChange={changeTaskStatusHandler}/>
        </>
    )
}