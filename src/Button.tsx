import React from 'react';

type ButtonProps = {
    title: string;
    OnClickHandler?: () => void;

}
export function Button ({title, OnClickHandler}: ButtonProps) {
    return <button onClick={OnClickHandler}>{title}</button>

}