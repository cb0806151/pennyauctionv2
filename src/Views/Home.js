import React, { useContext } from 'react';
import TabletButton from '../Components/TabletButton'
import { CoreState } from '../Util/CoreState';


export default function Home() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)

    let panelContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    let walletConnectionNotice = {
        position: 'absolute',
        zIndex: '100',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 'calc(100% - 100px)',
        height: '70vh',
        margin: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div>
            <div style={(state.account === undefined) ? walletConnectionNotice : {display: 'none'}}>
                <h1>Please connect your wallet first</h1>
            </div>
            <div style={panelContainer}>
                <TabletButton onClickFunction={(state.account === undefined) ? null : () => dispatch({var: 'page', type: 'set', value: 'StartAuction'})} message="Start Auction"/>
                <TabletButton onClickFunction={(state.account === undefined) ? null : () => dispatch({var: 'page', type: 'set', value: 'JoinAuction'})} message="Join Auction"/>
            </div>
        </div>
    )
}