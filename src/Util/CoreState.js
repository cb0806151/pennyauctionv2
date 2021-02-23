import React from 'react';

const State = React.createContext();
const Dispatch = React.createContext();

const reducer = (state, action) => {
    let update = {}
    switch (action.type) {
        case 'increment':
            if (Number.isNaN(parseInt(action.value))) return state
            update[action.var] = parseInt(state[action.var]) + parseInt(action.value)
            return {
                ...state,
                ...update,
            }
        case 'set':
            update[action.var] = action.value
            return {
                ...state,
                ...update,
            }
        default:
            return state
    }
}

const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, { 
        currencyAbbreviation: "ETH",
        balance: 0, 
        page: 'Home',
        account: undefined,
        potAmount: 0,
        lastBidAddress: "",
        inviteLink: "",
        mayBet: false,
        betAmount: 0,
    })

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export const CoreState = {
    State,
    Dispatch,
    Provider,
}