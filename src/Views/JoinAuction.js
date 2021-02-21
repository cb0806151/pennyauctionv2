import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';

export default function JoinAuction() {
    const dispatch = useContext(CoreState.Dispatch)

    const side = {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const container = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
    }

    const goToBettingPage = () => {
        dispatch({var: 'page', type: 'set', value: 'Better'})
    }

    return (
      <div style={container}>
          <div style={{...side, flexDirection: 'column'}}>
              <textarea style={{width: '50%', height: '50%'}}></textarea>
              <button onClick={() => goToBettingPage()}>Submit Invite</button>
          </div>
          <hr style={{height: '100%'}}/>
          <div style={side}>
              <button onClick={() => goToBettingPage()}>Submit invite link from clipboard</button>
          </div>
      </div>
    )
}