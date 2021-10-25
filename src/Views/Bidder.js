import React, { useState, useContext, useRef, useEffect } from "react";
import Popup from "../Components/Popup";
import { CoreState } from "../Util/CoreState";
import * as backend from "../Contract/build/index.main.mjs";
import { getAddressWording } from "../Util/UtilityFunctions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { loadStdlib } from "@reach-sh/stdlib";
const reach = loadStdlib({
  REACH_CONNECTOR_MODE: "ALGO",
  REACH_DEBUG: "yes",
});

export default function Bidder() {
  const state = useContext(CoreState.State);
  const dispatch = useContext(CoreState.Dispatch);
  const [popupOpen, setPopupOpen] = useState(false);
  const [interacts, setInteracts] = useState();

  const popupProps = {
    open: popupOpen,
    handleClose: () => setPopupOpen(false),
    message: "Someone bid before you could",
  };

  useEffect(() => {
    attach(state.inviteLink);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fmt = (x) => reach.formatCurrency(x, 4);

  const placedBid = async () => {
    try {
      const [lastBidAddress, potAmount] = await interacts.placedBid(true);
      dispatch({ var: "lastBidAddress", type: "set", value: lastBidAddress });
      dispatch({ var: "potAmount", type: "set", value: fmt(potAmount) });
      dispatch({ var: "bidAmount", type: "set", value: fmt(potAmount / 100) });
    } catch (e) {
      console.log(e);
      setPopupOpen(true);
    }
  };

  const attach = (ctcInfoStr) => {
    const ctc = state.account.contract(backend, JSON.parse(ctcInfoStr));
    const put = ctc.a.Bidder;
    setInteracts(put);
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
              state.account.networkAccount.addr
            )}{" "}
          </Button>
          made the last bid
        </Typography>
        <Divider style={{ width: "50%", margin: "10px" }} />
        <Typography gutterBottom variant="h5" component="h5">
          Current pot balance:
          {state.potAmount === 0
            ? " ...one moment please"
            : ` ${state.potAmount} ${state.applicationNetwork}`}
        </Typography>
        <Divider style={{ width: "50%", margin: "10px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h5" component="h5">
            Make a bid of {state.bidAmount} {state.applicationNetwork}?
          </Typography>
          <ButtonGroup aria-label="outlined button group">
            <Button onClick={placedBid}>Yes</Button>
          </ButtonGroup>
        </div>
      </CardContent>
      <Popup {...popupProps} />
    </Card>
  );
}
