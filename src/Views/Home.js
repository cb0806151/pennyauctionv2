import React, { useContext } from 'react';
import TabletButton from '../Components/TabletButton'
import { CoreState } from '../Util/CoreState';


const Home = () => {
    const dispatch = useContext(CoreState.Dispatch)

    let panelContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const navigateToPage = (pageName) => {
        dispatch({var: 'page', type: 'set', value: pageName})
    }

    return (
        <div>
            <div style={panelContainer}>
                <TabletButton onClickFunction={() => navigateToPage('Test')} message="Start Auction"/>
                <TabletButton onClickFunction={() => navigateToPage('App')} message="Join Auction"/>
            </div>
        </div>
    )
}

export default Home;