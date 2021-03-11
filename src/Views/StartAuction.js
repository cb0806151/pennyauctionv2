import React, { useContext, useState } from "react";
import { CoreState } from "../Util/CoreState";
import * as backend from "../build/index.main.mjs";
import * as reach from "@reach-sh/stdlib/ALGO";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";

export default function StartAuction() {
  const state = useContext(CoreState.State);
  const dispatch = useContext(CoreState.Dispatch);
  const [deadline, setDeadline] = useState(0);
  const [potAmount, setPotAmount] = useState(0);
  const [contractDeploying, setContractDeploying] = useState(false);

  const fmt = (x) => reach.formatCurrency(x, 4);

  const updateBalance = (potBalance) => {
    dispatch({ var: "potAmount", type: "set", value: fmt(potBalance) });
  };

  const auctionEnds = (winnerAddress) => {
    dispatch({ var: "lastBidAddress", type: "set", value: winnerAddress });
    dispatch({ var: "page", type: "set", value: "AuctionEnd" });
  };

  const getParams = () => {
    const params = {
      deadline: deadline,
      potAmount: reach.parseCurrency(potAmount),
      initialAddress: state.account,
    };
    return params;
  };

  const deploy = async () => {
    const ctc = state.account.deploy(backend);
    backend.Auctioneer(ctc, { getParams, auctionEnds, updateBalance });
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
    dispatch({ var: "inviteLink", type: "set", value: ctcInfoStr });
  };

  const startAuction = async () => {
    setContractDeploying(true);
    await deploy();
    dispatch({ var: "potAmount", type: "set", value: potAmount });
    dispatch({ var: "page", type: "set", value: "Auctioneer" });
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
          Set Auction Attributes
        </Typography>
        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="deadline-input">Deadline (in blocks)</InputLabel>
          <OutlinedInput
            id="deadline-input"
            type={"text"}
            onChange={(event) => setDeadline(event.target.value)}
            labelWidth={150}
            autoComplete="off"
          />
        </FormControl>
        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="initial-balance-input">
            Initial Pot Balance (in {state.applicationNetwork})
          </InputLabel>
          <OutlinedInput
            id="initial-balance-input"
            type={"text"}
            onChange={(event) => setPotAmount(event.target.value)}
            labelWidth={200}
            autoComplete="off"
          />
        </FormControl>
        {contractDeploying ? (
          <LoadingButton pending variant="outlined">
            Submit
          </LoadingButton>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            disabled={
              deadline === 0 ||
              potAmount === 0 ||
              deadline.length === 0 ||
              potAmount.length === 0
            }
            onClick={() => startAuction()}
          >
            Start Auction
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
