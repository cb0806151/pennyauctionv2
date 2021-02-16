import './App.css';
import React from 'react';
import * as stdlib from '@reach-sh/stdlib/ETH';

class App extends React.Component {

  async connectWallet() {
    const account = await stdlib.getDefaultAccount();
    const balanceAtomic = await stdlib.balanceOf(account);
    const balance = stdlib.formatCurrency(balanceAtomic, 4);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.connectWallet()}>Connect Wallet</button>
        </header>
      </div>
    )
  }

}

export default App;