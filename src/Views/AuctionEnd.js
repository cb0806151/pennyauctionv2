import React, { useContext } from "react";
import { CoreState } from "../Util/CoreState";
import { getAddressWording } from "../Util/UtilityFunctions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

export default function AuctionEnd() {
  const state = useContext(CoreState.State);
  const dispatch = useContext(CoreState.Dispatch);

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
          The auction has finished!
        </Typography>
        <Divider style={{ width: "50%", margin: "10px" }} />
        <Typography gutterBottom variant="h5" component="h3">
          <Button variant="contained" style={{ marginRight: "10px" }}>
            {getAddressWording(
              state.lastBidAddress,
              state.account?.networkAccount?.address
            )}
          </Button>
          won the pot worth {state.potAmount} {state.currencyAbbreviation}!
        </Typography>
        <Divider style={{ width: "50%", margin: "10px" }} />
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => dispatch({ var: "page", type: "set", value: "Home" })}
        >
          Exit
        </Button>
      </CardContent>
    </Card>
  );
}
