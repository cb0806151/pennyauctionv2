import { useState } from 'react';
import GlobalContext from '../Util/GlobalContext';
import Exports from '../Util/Exports';
import Navbar from '../Components/Navbar';

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
                <Navbar />
                <header className="App-header">
                    {renderPage(page, Exports)}
                </header>
            </div>
        </GlobalContext.Provider>
    )
}

export default Wrapper;