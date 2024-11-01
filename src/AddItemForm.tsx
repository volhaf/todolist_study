
import { AddCard } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react'


type AddItemFormPropsType = {
	addItem: (itemTitle: string) => void
}


export function AddItemForm ({addItem}: AddItemFormPropsType) {
	const [itemTitle, setItemTitle] = useState('');
	const [error, setError] = useState<string | null>(null);


    const addItemHandler = () => {
		if (itemTitle.trim() !== '') {
			addItem(itemTitle.trim())
			setItemTitle('')
		} else {
			setError('Title is required')
		}
	}




	const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setItemTitle(event.currentTarget.value)
	}
	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}

	
return  <div>

<TextField
variant={'standard'}
error ={!!error}
value={itemTitle}
onChange={changeItemHandler}
onKeyUp={addItemOnKeyUpHandler}
helperText= {error}
/>

<IconButton onClick={addItemHandler}color={'primary'}>
	<AddCard/>
</IconButton>
</div>
}