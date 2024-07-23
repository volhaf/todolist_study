import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

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

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}