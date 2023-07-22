import React from 'react';


type ButtonType = {
    name: string;
    callback: () => void;
    className?: string;
    disabled?: boolean;

}
export const Button: React.FC<ButtonType> = ({name, callback, className, disabled}) => {

    const onClickRemoveTaskHandler = () => callback();
    return (
        <>
            <button
                className={className}
                onClick={onClickRemoveTaskHandler}
                disabled={disabled}
            >{name}</button>
        </>
    )
}