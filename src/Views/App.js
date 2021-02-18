import './App.css';
import { useContext } from 'react';
import GlobalContext from '../Util/GlobalContext';

function App() {
  const context = useContext(GlobalContext);

    return (
      <div>
          <button onClick={() => context.setCurrentPage('Test')}>Go to Test?</button>
      </div>
    )
}

export default App;