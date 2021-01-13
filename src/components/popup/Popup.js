import React from 'react'
import classes from './Popup.module.scss';

function Popup({isVisible, children}) {
    if(!isVisible) return (null);

    return (
        <div className={classes.popup}>
            {children}
        </div>
    )
}

export default Popup
