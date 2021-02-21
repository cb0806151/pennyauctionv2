import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import ValueSetter from '../Components/ValueSetter';

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

    return (
      <div>
          <h1>Current Deadline: {state.deadline}</h1>
          <h1>Current Pot Amount: {state.initialPotAmount}</h1>
          <ValueSetter {...deadlineProps} />
          <ValueSetter {...potAmountProps} />
          <button disabled={state.deadline === 0 || state.initialPotAmount === 0} onClick={() => dispatch({var: 'page', type: 'set', value: 'Auctioneer'})}>Start Auction</button>
      </div>
    )
}