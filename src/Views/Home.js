import React, { useContext } from 'react';
import TabletButton from '../Components/TabletButton'
import { CoreState } from '../Util/CoreState';


export default function Home() {
    const dispatch = useContext(CoreState.Dispatch)

    let panelContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div>
            <div style={panelContainer}>
                <TabletButton onClickFunction={() => dispatch({var: 'page', type: 'set', value: 'StartAuction'})} message="Start Auction"/>
                <TabletButton onClickFunction={() => dispatch({var: 'page', type: 'set', value: 'JoinAuction'})} message="Join Auction"/>
            </div>
        </div>
    )
}