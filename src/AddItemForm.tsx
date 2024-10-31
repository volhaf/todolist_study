// import { Button } from './Button'
import Button from '@mui/material/Button';
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
 <input
	 className={error ? 'error' : ''}
	 value={itemTitle}
	 onChange={changeItemHandler}
	 onKeyUp={addItemOnKeyUpHandler}
 />

 <Button onClick={addItemHandler} variant={'outlined'} color={'secondary'} size={'small'}>+</Button>

 {error && <div className={'error-message'}>{error}</div>}
</div>
}