import { Button } from './Button'
import { ChangeEvent, KeyboardEvent, useState } from 'react'


type AddItemFormPropsType = {
	addItem: (itemTitle: string) => void
	todolistId: string
}


function AddItemForm ({addItem}: AddItemFormPropsType) {
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
 <Button title={'+'} onClick={addItemHandler}/>
 {error && <div className={'error-message'}>{error}</div>}
</div>
}