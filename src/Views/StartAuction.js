import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import ValueSetter from '../Components/ValueSetter';
import * as backend from '../build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';

export default function StartAuction() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)

    const deadlineProps = {
      inputType: "number",
      inputMessage: "0",
      buttonMessage: "Set Deadline",
      inputRef: React.createRef(0),
      var: "deadline",
      type: "set",
      validateInput: true,
      onClickFunction: dispatch,
    }

    const potAmountProps = {
      inputType: "number",
      inputMessage: "0.0",
      buttonMessage: "Set Initial Pot Amount",
      inputRef: React.createRef(0),
      var: "initialPotAmount",
      type: "set",
      validateInput: true,
      onClickFunction: dispatch,
    }

    const auctionEnds = async () => {
      console.log("The auction has finished!");
    }

    const getParams = () => {
      console.log("getting params");
      const params = {
        deadline: 3,
        potAmount: reach.parseCurrency(0.1),
        potAddress: state.account,
      }
      return params;
    }
    
    const deploy = async () => {
        console.log("deploying")
        const ctc = state.account.deploy(backend);
        backend.Auctioneer(ctc, {getParams, auctionEnds});
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
          <ValueSetter {...deadlineProps} />
          <ValueSetter {...potAmountProps} />
          <button disabled={state.deadline === 0 || state.initialPotAmount === 0} onClick={() => startAuction()}>Start Auction</button>
      </div>
    )
}