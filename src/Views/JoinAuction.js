import React, { useContext, createRef } from 'react';
import { CoreState } from '../Util/CoreState';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default function JoinAuction() {
    const dispatch = useContext(CoreState.Dispatch)
    const inviteTextArea = createRef();
    
    const goToBiddingPage = async () => {
        let inviteLink = inviteTextArea.current.value;
        dispatch({var: 'lastBidAddress', type: 'set', value: JSON.parse(inviteLink).creator});
        dispatch({var: 'inviteLink', type: 'set', value: inviteLink});
        dispatch({var: 'page', type: 'set', value: 'Bidder'})
    }

    return (
        <Card style={{width: '100%', height: '100%'}}>
            <CardContent style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Typography gutterBottom variant="h5" component="h2">
                    Auction Invite Entry
                </Typography>
                <TextField
                    ref={inviteTextArea}
                    style={{width: '80%', marginBottom: '20px'}}
                    id="outlined-multiline-static"
                    label="Invite"
                    multiline
                    rows={4}
                    variant="outlined" />
                <Button variant="outlined" color="inherit" onClick={() => goToBiddingPage()}>Submit Invite</Button>
            </CardContent>
        </Card>
    )
}