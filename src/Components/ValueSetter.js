import React from 'react'

export default function ValueSetter(props) {

    return (
        <div>
            <input ref={props.inputRef} type={props.inputType} placeholder={props.inputMessage}/>
            <button onClick={() => props.onClickFunction({var: props.var, type: props.type, value: props.inputRef.current.value})}>{props.buttonMessage}</button>
        </div>
    )
}