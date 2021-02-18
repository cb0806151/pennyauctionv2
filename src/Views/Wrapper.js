import { useState } from 'react';
import GlobalContext from './../Components/GlobalContext';
import Exports from './Exports';

function Wrapper(props) {

    const [page, setPage] = useState('Test');

    const setCurrentPage = (page) => {
        setPage(page);
    }

    const gState = {
        page: page,
        setCurrentPage,
    };

    const renderPage = (pageName, Pages) => {
        const Page = Pages[pageName];
        return <Page/>;
    }

    return (
        <GlobalContext.Provider value={gState}>
            <div className="App">
                <header className="App-header">
                    {renderPage(page, Exports)}
                </header>
            </div>
        </GlobalContext.Provider>
    )
}

export default Wrapper;