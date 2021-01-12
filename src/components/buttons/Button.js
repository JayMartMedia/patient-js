import React from 'react'

function Button({text, className, onClick, disabled = false}) {
    return (
        <button 
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button
