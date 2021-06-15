import React from 'react';
import './style.css';

export const ItemCheck: React.FC<{children: React.ReactNode, value: boolean, handleCheck: (id:number, value: boolean) => void, id: number}> = ({children, value, handleCheck, id}) => {
    function handleChange(event:any) {
        handleCheck(id, event.target.checked)
    }

    return <label className="containerCheck">{children}
        <input type="checkbox" defaultChecked={value} onChange={handleChange}/>
        <span className="checkmark"/>
    </label>
}