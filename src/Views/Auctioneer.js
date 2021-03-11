import React, { useContext } from "react";
import { CoreState } from "../Util/CoreState";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

export default function Auctioneer() {
  const state = useContext(CoreState.State);

  const copyInviteLink = () => {
    navigator.clipboard.writeText(state.inviteLink);
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
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => copyInviteLink()}
        >
          Copy invite link
        </Button>
        <Divider style={{ width: "50%", margin: "10px" }} />
        <Typography gutterBottom variant="h5" component="h2">
          Current pot balance: {state.potAmount} {state.applicationNetwork}
        </Typography>
      </CardContent>
    </Card>
  );
}
