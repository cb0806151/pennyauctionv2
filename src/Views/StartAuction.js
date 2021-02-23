import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import * as backend from '../build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';

export default function StartAuction() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)
    const [deadline, setDeadline] = React.useState(0);
    const [potAmount, setPotAmount] = React.useState(0);
    const deadlineInput = React.createRef();
    const potAmountInput = React.createRef();

    const fmt = (x) => reach.formatCurrency(x, 4);

    const updateBalance = (potBalance) => {
      dispatch({var: 'potAmount', type: 'set', value: fmt(potBalance)})
    }

    const auctionEnds = (winnerAddress) => {
      dispatch({var: 'lastBidAddress', type: 'set', value: winnerAddress})
      dispatch({var: 'page', type: 'set', value: 'AuctionEnd'})
    }

    const getParams = () => {
      const params = {
        deadline: 3,
        potAmount: reach.parseCurrency(0.1),
        potAddress: state.account,
      }
      return params;
    }
    
    const deploy = async () => {
        const ctc = state.account.deploy(backend);
        backend.Auctioneer(ctc, {getParams, auctionEnds, updateBalance});
        const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
        dispatch({var: 'inviteLink', type: 'set', value: ctcInfoStr});
    }

    const startAuction = async () => {
      await deploy()
      dispatch({var: 'page', type: 'set', value: 'Auctioneer'})
    }

    return (
      <div>
          <h1>Current Deadline: {state.deadline}</h1>
          <h1>Current Pot Amount: {state.initialPotAmount}</h1>
          <input ref={deadlineInput} onChange={() => setDeadline(deadlineInput.current.value)} type="number" placeholder="0"/>
          <input ref={potAmountInput} onChange={() => setPotAmount(potAmountInput.current.value)} type="number" placeholder="0.0"/>
          <button disabled={deadline === 0 || potAmount === 0} onClick={() => startAuction()}>Start Auction</button>
      </div>
    )
}