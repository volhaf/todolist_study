// import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null)


    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const buttonStyle = {
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px',

    }
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            <Button onClick={addItemHandler} variant="contained" style={buttonStyle}  >+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}