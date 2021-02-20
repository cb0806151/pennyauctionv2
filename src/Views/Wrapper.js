import React, { useState } from 'react';
import GlobalContext from '../Util/GlobalContext';
import Exports from '../Util/Exports';
import Navbar from '../Components/Navbar';

function Wrapper(props) {

    const [page, setPage] = useState('Test');
    const [account, setAccount] = useState(undefined);
    const [balance, setBalance] = useState(0);

    const setCurrentPage = (page) => {
        setPage(page);
    }

    const setCurrentAccount = (acc) => {
        setAccount(acc);
    }

    const setCurrentBalance = (bal) => {
        setBalance(bal);
    }

    const gState = {
        page: page,
        account: account,
        balance: balance,
        setCurrentPage,
        setCurrentAccount,
        setCurrentBalance,
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