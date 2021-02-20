import * as stdlib from '@reach-sh/stdlib/ETH';
import React, { useContext, useState } from 'react';
import GlobalContext from '../Util/GlobalContext';

function ConnectWallet() {
    const context = useContext(GlobalContext);
    const fundInput = React.createRef(0);

    const [processing, setProcessing] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [faucet, setFaucet] = useState(undefined);
    
    const connectWallet = async () => {
        setProcessing(true);
        const account = await stdlib.getDefaultAccount();
        context.setCurrentAccount(account);
        const balanceAtomic = await stdlib.balanceOf(account);
        const balance = stdlib.formatCurrency(balanceAtomic, 4);
        context.setCurrentBalance(balance);
    }

    const getWalletBalance = async () => {
        const balanceAtomic = await stdlib.balanceOf(context.account);
        const balance = stdlib.formatCurrency(balanceAtomic, 4);
        context.setCurrentBalance(balance);
    }

    const toggleDropdown = async () => {
        setDropdownVisible(dropdownVisible ? false : true);
        try {
            setFaucet(await stdlib.getFaucet());
        } catch {
            setDropdownVisible(dropdownVisible ? false : true);
        }
    }

    const depositFunds = async (funds) => {
        await stdlib.transfer(faucet, context.account, stdlib.parseCurrency(funds));
        await getWalletBalance();
        fundInput.current.value = fundInput.current.defaultValue
    }

    let dropdownPanel = {
        background: 'gray',
        position: 'absolute',
        transform: 'translate(-100%, 0)',
        padding: '10px',
    }

    return (
        <div>
            {
                (context.account === undefined) 
                    ? 
                <button disabled={processing} onClick={() => connectWallet()}>Connect Wallet</button>
                    :
                <button onClick={() => toggleDropdown()}>Fund Wallet</button>
            }
            {
                dropdownVisible
                    ?
                <div style={dropdownPanel}>
                    <h3>Balance: {context.balance}</h3>
                    <div>
                        <input ref={fundInput} type="number" placeholder="0.00"/>
                        <button onClick={() => depositFunds(fundInput.current.value)}>Deposit Funds</button>
                    </div>
                </div>
                    : null
            }
            
        </div>
    )
}

export default ConnectWallet;