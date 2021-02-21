import React from 'react'

export default function ValueSetter(props) {
    const [value, setValue] = React.useState(undefined)

    const validateInput = (value) => {
        if (Number.isNaN(parseInt(value))) return 0;
        if (value < 0) return 0;
        return value;
    }

    return (
        <div>
            <input ref={props.inputRef} type={props.inputType} placeholder={props.inputMessage} onChange={() => setValue(props.inputRef.current.value)}/>
            <button onClick={() => props.onClickFunction({var: props.var, type: props.type, value: props.validateInput ? validateInput(value) : value})}>{props.buttonMessage}</button>
        </div>
    )
}