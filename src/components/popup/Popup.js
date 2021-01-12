import React from 'react'

function Popup({isVisible, children}) {
    if(!isVisible) return (null);

    return (
        <div>
            {children}
        </div>
    )
}

export default Popup
