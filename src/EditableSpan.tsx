import React, { useState } from "react"

type EditableSpanPropsType = {
	title: string

}

export function EditableSpan (props: EditableSpanPropsType ) {
    let [editMode, setEditMode] = useState(false);
    const activateEditeMode =() => setEditMode(true)
 return ( 
    editMode 
    ? <input value={props.title}/>
    : <span onDoubleClick={activateEditeMode}>{props.title}</span>
 )
}
