import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import * as backend from '../build/index.main.mjs';


export default function JoinAuction() {
    const state = useContext(CoreState.State)
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

    const auctionEnds = async () => {
        console.log("The auction has finished!");
        dispatch({var: 'page', type: 'set', value: 'AuctionEnd'})
    }

    const attach = (ctcInfoStr) => {
        const ctc = state.account.attach(backend, JSON.parse(ctcInfoStr));
        backend.Better(ctc, {auctionEnds});
    }

    const goToBettingPage = () => {
        attach(inviteTextArea.current.value)
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