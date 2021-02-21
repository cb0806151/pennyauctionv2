import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';

export default function Better() {
    const state = useContext(CoreState.State)

    const container = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '200px',
    }

    return (
      <div style={container}>
            <h1>{state.lastBidAddress} made the last bid</h1>
            <h1>Current pot balance: {state.balance}</h1>
            <hr/>
            <h1>Make a bet?</h1>
            <div>
                <button>Yes</button>
                <button>No</button>
            </div>
      </div>
    )
}