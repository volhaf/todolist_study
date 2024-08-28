// import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',

    }
    return (
        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error ? error : 'type smth. please)'}
                variant="outlined"
                size={'small'}
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button onClick={addItemHandler} variant="contained" style={buttonStyle} >+</Button>
        </div>
    )
}