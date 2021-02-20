import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';

function App() {
    const dispatch = useContext(CoreState.Dispatch)

    return (
      <div>
          <button onClick={() => dispatch({var: 'page', type: 'set', value: 'Home'})}>Go to Test?</button>
      </div>
    )
}

export default App;