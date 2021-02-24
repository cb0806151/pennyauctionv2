import React, { useContext, createRef } from 'react';
import { CoreState } from '../Util/CoreState';


export default function JoinAuction() {
    const dispatch = useContext(CoreState.Dispatch)
    const inviteTextArea = createRef();

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
    
    const goToBiddingPage = async () => {
        let inviteLink = inviteTextArea.current.value;
        dispatch({var: 'lastBidAddress', type: 'set', value: JSON.parse(inviteLink).creator});
        dispatch({var: 'inviteLink', type: 'set', value: inviteLink});
        dispatch({var: 'page', type: 'set', value: 'Bidder'})
    }

    return (
      <div style={container}>
          <div style={inviteInput}>
              <textarea ref={inviteTextArea} style={{width: '50%', height: '50%'}}></textarea>
              <button onClick={() => goToBiddingPage()}>Submit Invite</button>
          </div>
      </div>
    )
}