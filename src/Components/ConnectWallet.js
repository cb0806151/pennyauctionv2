import * as stdlib from '@reach-sh/stdlib/ETH';
import React, { useContext, useState } from 'react';
import { CoreState } from '../Util/CoreState';

export default function ConnectWallet() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)
    const fundInput = React.createRef(0);

    const [processing, setProcessing] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [faucet, setFaucet] = useState(undefined);
    
    const connectWallet = async () => {
        setProcessing(true);
        const account = await stdlib.getDefaultAccount();
        dispatch({var: 'account', type: 'set', value: account})
        await getWalletBalance(account);
    }

    const getWalletBalance = async (acc) => {
        let balanceAtomic = await stdlib.balanceOf(acc);
        let balance = stdlib.formatCurrency(balanceAtomic, 4);
        dispatch({var: 'balance', type: 'set', value: balance})
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
        await stdlib.transfer(faucet, state.account, stdlib.parseCurrency(funds));
        dispatch({var: 'balance', type: 'increment', value: funds})
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
                (state.account === undefined) 
                    ? 
                <button disabled={processing} onClick={() => connectWallet()}>Connect Wallet</button>
                    :
                <button onClick={() => toggleDropdown()}>Fund Wallet</button>
            }
            {
                dropdownVisible
                    ?
                <div style={dropdownPanel}>
                    <h3>Balance: {state.balance}</h3>
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