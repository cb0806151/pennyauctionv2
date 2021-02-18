import './App.css';
import { useContext } from 'react';
import * as stdlib from '@reach-sh/stdlib/ETH';
import GlobalContext from '../Util/GlobalContext';

function App() {
  const context = useContext(GlobalContext);

  const connectWallet = async () => {
    const account = await stdlib.getDefaultAccount();
    const balanceAtomic = await stdlib.balanceOf(account);
    const balance = stdlib.formatCurrency(balanceAtomic, 4);
    console.log(balance);
  }

    return (
      <div>
          <button onClick={() => connectWallet()}>Connect Wallet</button>
          <button onClick={() => context.setCurrentPage('Test')}>Go to Test?</button>
      </div>
    )
}

export default App;