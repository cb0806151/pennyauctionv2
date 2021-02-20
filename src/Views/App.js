import './App.css';
import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';

function App() {
    const dispatch = useContext(CoreState.Dispatch)

    return (
      <div>
          <button onClick={() => dispatch({var: 'page', type: 'set', value: 'Test'})}>Go to Test?</button>
      </div>
    )
}

export default App;