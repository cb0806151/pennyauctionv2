import React, { useState, useContext, useRef, useEffect } from "react";
import Popup from "../Components/Popup";
import { CoreState } from "../Util/CoreState";
import * as backend from "../build/index.main.mjs";
import * as reach from "@reach-sh/stdlib/ETH";
import { getAddressWording } from "../Util/UtilityFunctions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function Bidder() {
  const state = useContext(CoreState.State);
  const dispatch = useContext(CoreState.Dispatch);
  const yesButton = useRef();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const popupProps = {
    open: open,
    handleClose: () => handleClose(),
    message: "Somone bid before you could",
  };

  useEffect(() => {
    attach(state.inviteLink);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fmt = (x) => reach.formatCurrency(x, 4);

  const getBalance = async (who) => fmt(await reach.balanceOf(who));

  const auctionEnds = async (winnerAddress) => {
    dispatch({ var: "lastBidAddress", type: "set", value: winnerAddress });
    dispatch({ var: "page", type: "set", value: "AuctionEnd" });
  };

  const placedBid = async (attendeeAddress, potBalance) => {
    dispatch({ var: "lastBidAddress", type: "set", value: attendeeAddress });
    dispatch({ var: "potAmount", type: "set", value: fmt(potBalance) });
    if (reach.addressEq(attendeeAddress, state.account)) {
      const balance = await getBalance(state.account);
      dispatch({ var: "balance", type: "set", value: balance });
    } else {
      handleOpen();
    }
  };

  const mayBid = async (bidAmount, potBalance) => {
    const translatedBidAmount = fmt(bidAmount);
    dispatch({ var: "bidAmount", type: "set", value: translatedBidAmount });
    dispatch({ var: "mayBid", type: "set", value: true });
    dispatch({ var: "potAmount", type: "set", value: fmt(potBalance) });
    const balance = await getBalance(state.account);
    const mayBid = balance > translatedBidAmount;
    if (mayBid === false) return mayBid;
    const bidStatus = await new Promise((resolve) => {
      yesButton.current.addEventListener("click", (e) => resolve(true), {
        once: true,
      });
    });
    dispatch({ var: "mayBid", type: "set", value: false });
    return bidStatus;
  };

  const attach = (ctcInfoStr) => {
    const ctc = state.account.attach(backend, JSON.parse(ctcInfoStr));
    backend.Bidder(ctc, { auctionEnds, mayBid, placedBid });
  };

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <CardContent
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography gutterBottom variant="h5" component="h2">
          <Button variant="contained" style={{ marginRight: "10px" }}>
            {getAddressWording(
              state.lastBidAddress,
              state.account.networkAccount.address
            )}{" "}
          </Button>
          made the last bid
        </Typography>
        <Divider style={{ width: "50%", margin: "10px" }} />
        <Typography gutterBottom variant="h5" component="h5">
          Current pot balance:{" "}
          {state.potAmount === 0 ? "...one moment please" : state.potAmount}{" "}
          {state.currencyAbbreviation}
        </Typography>
        <Divider style={{ width: "50%", margin: "10px" }} />
        {state.mayBid ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h5" component="h5">
              Make a bid of {state.bidAmount} {state.currencyAbbreviation}?
            </Typography>
            <ButtonGroup aria-label="outlined button group">
              <Button ref={yesButton}>Yes</Button>
            </ButtonGroup>
          </div>
        ) : (
          <Typography gutterBottom variant="h5" component="h5">
            ...Waiting for next bidding cycle to start...
          </Typography>
        )}
      </CardContent>
      <Popup {...popupProps} />
    </Card>
  );
}
