import React, { useState } from 'react'
import "./ResourceMenu.css"


export const ResourceMenu = ({ item ,setActiveItem}) => {
    const [subNav, setSubnav] = useState(false);
    const [color, setColor] = useState("#0fa37f");

    const handleClick = () => {
        setSubnav(!subNav)
        if (color === "black") {
            setColor("#0fa37f")
        } else {
            setColor("black")
        }
    }

    return (
        <div className='resource__sidebar'>
            <div className='sidebar__link'
                style={{ 
                    color: `${color}`
                }} onClick={
                    handleClick
                }>
                <div>{item.title}</div>
            </div>
            {subNav &&
                item.subNav.map((item, index) => {
                    return (
                        <div className='dropdown__link' key={index}>
                            <div 
                            onClick={() => setActiveItem(item)}
                            >{item.title}</div>
                        </div>
                    );
                })
            }
        </div>
    )
}
