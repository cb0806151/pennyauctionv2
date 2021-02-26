import React, { useContext, useState, createRef } from 'react';
import { CoreState } from '../Util/CoreState';
import * as backend from '../build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';


export default function StartAuction() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)
    const [deadline, setDeadline] = useState(0);
    const [potAmount, setPotAmount] = useState(0);

    const fmt = (x) => reach.formatCurrency(x, 4);

    const updateBalance = (potBalance) => {
      dispatch({var: 'potAmount', type: 'set', value: fmt(potBalance)})
    }

    const auctionEnds = (winnerAddress) => {
      dispatch({var: 'lastBidAddress', type: 'set', value: winnerAddress})
      dispatch({var: 'page', type: 'set', value: 'AuctionEnd'})
    }

    const getParams = () => {
      const params = {
        deadline: deadline,
        potAmount: reach.parseCurrency(potAmount),
        potAddress: state.account,
      }
      return params;
    }
    
    const deploy = async () => {
        const ctc = state.account.deploy(backend);
        backend.Auctioneer(ctc, {getParams, auctionEnds, updateBalance});
        const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
        dispatch({var: 'inviteLink', type: 'set', value: ctcInfoStr});
    }

    const startAuction = async () => {
      await deploy()
      dispatch({var: 'potAmount', type: 'set', value: potAmount})
      dispatch({var: 'page', type: 'set', value: 'Auctioneer'})
    }

    return (
      <Card style={{width: '100%', height: '100%'}}>
        <CardContent style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Typography gutterBottom variant="h5" component="h2">
            Set Auction Attributes
          </Typography>
          <FormControl variant="outlined" style={{marginBottom: '20px'}}>
            <InputLabel htmlFor="outlined-adornment-password">Deadline</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                onChange={(event) => setDeadline(event.target.value)}
                labelWidth={70}
            />
          </FormControl>
          <FormControl variant="outlined" style={{marginBottom: '20px'}}>
            <InputLabel htmlFor="outlined-adornment-password">Initial Pot Balance</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                onChange={(event) => setPotAmount(event.target.value)}
                labelWidth={140}
            />
          </FormControl>
          <Button variant="outlined" color="inherit" disabled={(deadline === 0 || potAmount === 0 || deadline.length === 0 || potAmount.length === 0)} onClick={() => startAuction()}>Start Auction</Button>
        </CardContent>
      </Card>
    )
}