import {useState} from "react";

type EditableSpanPropsType = {
    title: string
    changetitleCallback: (newTitle: string) => void
}

export const EditableSpan = ({title, changetitleCallback}:EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const onEditMode = ()=> setEditMode (true);
        const offEditMode = ()=> setEditMode (false);

    return (
        editMode
            ? <input
            value={title}
            autoFocus={}
            onBlur={offEditMode}

            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}