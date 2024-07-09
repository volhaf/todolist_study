import React from 'react';

type ButtonProps = {
    title: string;
    OnClickHandler?: () => void;
    disabled?: boolean;
    buttonColor?: string

}

export function Button({title, OnClickHandler, disabled, buttonColor}: ButtonProps) {
    return <button className={buttonColor}
                   onClick={OnClickHandler}
                   disabled={disabled}>
        {title} </button>
}


