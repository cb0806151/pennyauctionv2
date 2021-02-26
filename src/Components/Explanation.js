import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Explanation(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"How A Penny Auction Works"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A penny auction is a rather simple bidding game.
          <br />
          <br />
          An Auctioneer starts an auction by placing an initial amount in the
          pot and setting a deadline. Once the auction has started, they can
          send out invites.
          <br />
          <br />
          Attendees use those invites to join an auction and compete to be the
          first to bid 1% of the current pot in a series of rounds.
          <br />
          <br />
          After each bid the deadline is reset to its inital value. However, if
          it ticks all the way down the auction ends and the last Attendee to
          make a bid wins the pot.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
