import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';

export default function Auctioneer() {
    const state = useContext(CoreState.State)

    const container = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '200px',
    }

    const copyInviteLink = () => {
      navigator.clipboard.writeText(state.inviteLink);
    }

    return (
      <div style={container}>
            <button onClick={() => copyInviteLink()}>Copy invite link</button>
            <h1>Current pot balance: {state.potAmount}</h1>
            <h1>Open up a new browser window to join your auction</h1>
      </div>
    )
}