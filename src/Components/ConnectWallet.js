import React from 'react';
import * as stdlib from '@reach-sh/stdlib/ETH';

function ConnectWallet() {

    const connectWallet = async () => {
        const account = await stdlib.getDefaultAccount();
        const balanceAtomic = await stdlib.balanceOf(account);
        const balance = stdlib.formatCurrency(balanceAtomic, 4);
        console.log(balance);
      }

    return (
        <div>
            <button onClick={() => connectWallet()}>Connect Wallet</button>
        </div>
    )
}

export default ConnectWallet;