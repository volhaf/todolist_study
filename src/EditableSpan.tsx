import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
	title: string
    onChange: (newValue: string) => void

}

export function EditableSpan (props: EditableSpanPropsType ) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTetle] = useState("");

    const activateEditeMode =() => {
        setEditMode(true);
        setTetle(props.title)
    }
    const activateViewMode =() => {
        setEditMode(false); 
        props.onChange(title);
    }

    const onChangeTitleHandler =(e: ChangeEvent<HTMLInputElement>) => setTetle(e.currentTarget.value)
 return ( 
    editMode 
    ? <TextField   size="small" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus ={true} />
    : <span onDoubleClick={activateEditeMode}>{props.title}</span>
 )
}
