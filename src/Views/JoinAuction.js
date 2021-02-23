import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';


export default function JoinAuction() {
    const dispatch = useContext(CoreState.Dispatch)
    const inviteTextArea = React.createRef();

    const inviteInput = {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }

    const container = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
    }

    const goToBettingPage = () => {
        dispatch({var: 'inviteLink', type: 'set', value: inviteTextArea.current.value});
        dispatch({var: 'page', type: 'set', value: 'Better'})
    }

    return (
      <div style={container}>
          <div style={inviteInput}>
              <textarea ref={inviteTextArea} style={{width: '50%', height: '50%'}}></textarea>
              <button onClick={() => goToBettingPage()}>Submit Invite</button>
          </div>
      </div>
    )
}