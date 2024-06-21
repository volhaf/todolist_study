import React from 'react';

type TodolistPropsType = {
    title: string;
}

export function Todolist ( {title}: TodolistPropsType) {
    return (
        <div className="todolist">
                <h3>{title}</h3>
            <div>
                <input/>
                <button>X</button>
            </div>
            <ul>
                <li>
                    <input type='checkbox' checked={true}/>
                    <span>cheese</span>
                    <button>x</button>
                </li>
                <li>
                    <input type='checkbox' checked={true}/>
                    <span>milk</span>
                    <button>x</button>
                </li>
                <li>
                    <input type='checkbox' checked={false}/>
                    <span>fish</span>
                    <button>x</button>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>

            </div>

        </div>

    )

}
