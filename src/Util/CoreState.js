import React, { createContext, useReducer } from "react";

const State = createContext();
const Dispatch = createContext();

const reducer = (state, action) => {
  let update = {};
  switch (action.type) {
    case "increment":
      if (Number.isNaN(parseFloat(action.value))) return state;
      update[action.var] =
        parseFloat(state[action.var]) + parseFloat(action.value);
      return {
        ...state,
        ...update,
      };
    case "set":
      update[action.var] = action.value;
      return {
        ...state,
        ...update,
      };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    currencyAbbreviation: "ETH",
    balance: 0,
    page: "Home",
    account: undefined,
    potAmount: 0,
    lastBidAddress: "",
    inviteLink: "",
    mayBid: false,
    bidAmount: 0,
  });

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  );
};

export const CoreState = {
  State,
  Dispatch,
  Provider,
};
