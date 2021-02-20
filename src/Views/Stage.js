import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import Exports from '../Util/Exports';
import Navbar from '../Components/Navbar';


function Stage() {
    const state = useContext(CoreState.State)

    const renderPage = (pageName, Pages) => {
        const Page = Pages[pageName];
        return <Page/>;
    }

    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                {renderPage(state.page, Exports)}
            </header>
        </div>
    )

}

export default Stage;