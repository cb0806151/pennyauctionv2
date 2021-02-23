import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import { getAddressWording } from '../Util/UtilityFunctions';

export default function AuctionEnd() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)

    const container = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '200px',
    }

    return (
      <div style={container}>
            <h1>The auction has finished!</h1>
    <h1>{getAddressWording(state.lastBidAddress, state.account.networkAccount.address)} won the pot worth {state.potAmount} {state.currencyAbbreviation}!</h1>
            <button onClick={() => dispatch({var: 'page', type: 'set', value: 'Home'})}>Exit</button>
      </div>
    )
}