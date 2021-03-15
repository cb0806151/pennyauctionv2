import * as reach from "@reach-sh/stdlib/ETH";
import React, { useContext, useState } from "react";
import { CoreState } from "../Util/CoreState";
import Popup from "../Components/Popup";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function ConnectWallet() {
  const state = useContext(CoreState.State);
  const dispatch = useContext(CoreState.Dispatch);

  const [processing, setProcessing] = useState(false);
  const [faucet, setFaucet] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const [amount, setAmount] = useState();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [depositingFunds, setDepositingFunds] = useState(false);

  const popupProps = {
    open: open,
    handleClose: () => {
      setOpen(false);
      setErrorMessage("");
    },
    message: errorMessage,
  };

  const fmt = (x) => reach.formatCurrency(x, 4);

  const getBalance = async (who) => fmt(await reach.balanceOf(who));

  const updateAmount = (event) => setAmount(event.target.value);

  const closeDropdown = () => setAnchorEl(null);

  const connectWallet = async () => {
    setProcessing(true);
    const account = await reach.getDefaultAccount();
    dispatch({ var: "account", type: "set", value: account });
    let balance = await getBalance(account);
    dispatch({ var: "balance", type: "set", value: balance });
  };

  const openDropdown = async (event) => {
    setAnchorEl(event.currentTarget);
    const balance = await getBalance(state.account);
    dispatch({ var: "balance", type: "set", value: balance });
    try {
      setFaucet(await reach.getFaucet());
    } catch {
      setAnchorEl(null);
    }
  };

  const validateInput = (value) => {
    value = parseFloat(value);
    let errorMessages = ``;
    if (Number.isNaN(value))
      errorMessages = `${errorMessages}\nNot a valid number`;
    if (value < 0)
      errorMessages = `${errorMessages}\nNumber must be greater than zero`;
    setErrorMessage(errorMessages);
    if (errorMessages !== ``) {
      setOpen(true);
      return 0;
    }

    return value;
  };

  const depositFunds = async () => {
    setDepositingFunds(true);
    let funds = amount;
    funds = validateInput(funds);
    await reach.transfer(faucet, state.account, reach.parseCurrency(funds));
    dispatch({ var: "balance", type: "increment", value: funds });
    setDepositingFunds(false);
  };

  return (
    <div>
      {state.account === undefined ? (
        <Button
          disabled={processing}
          aria-controls="wallet-menu"
          aria-haspopup="true"
          variant="outlined"
          color="inherit"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          aria-controls="wallet-menu"
          aria-haspopup="true"
          variant="outlined"
          color="inherit"
          onClick={openDropdown}
        >
          Fund Wallet
        </Button>
      )}

      <Menu
        id="wallet-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeDropdown}
      >
        <MenuItem disabled>
          Balance (in {state.applicationNetwork}):{" "}
          {depositingFunds ? (
            <LinearProgress style={{ width: "80%", margin: "0 10% 0 10px" }} />
          ) : (
            state.balance
          )}
        </MenuItem>
        <MenuItem>
          <FormControl variant="outlined">
            <InputLabel htmlFor="balance-input">Amount</InputLabel>
            <OutlinedInput
              id="balance-input"
              type={"text"}
              onChange={updateAmount}
              endAdornment={
                <InputAdornment position="end">
                  <Button onClick={async () => depositFunds()}>Add</Button>
                </InputAdornment>
              }
              labelWidth={60}
              autoComplete="off"
            />
          </FormControl>
        </MenuItem>
        <Popup {...popupProps} />
      </Menu>
    </div>
  );
}
