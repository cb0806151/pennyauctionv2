import React, { cloneElement } from "react";
import { CoreState } from "./CoreState";

const providers = [<CoreState.Provider />];

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  );

export { Store, CoreState };
