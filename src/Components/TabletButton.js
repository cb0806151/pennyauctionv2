import React from 'react'

export default function TabletButton(props) {
    let tabletPanel = {
        background: 'darkgray',
        border: '1px solid lime',
        width: '50%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={tabletPanel}>
            <h1 onClick={props.onClickFunction}>{props.message}</h1>
        </div>
    )
}