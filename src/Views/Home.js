import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function Home() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)

    let startAuctionImage = {
        backgroundImage: 'url("https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3005&q=80")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }

    let joinAuctionImage = {
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2015/11/13/06/56/jury-1041589_1280.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }

    return (
        <Card style={{width: '100%', height: '100%'}}>
            {(state.account === undefined) ? <Button variant="contained" color="secondary" style={{width: '100%'}}>Please connect your wallet to use the application</Button> : null}
            <Grid container spacing={3} style={{height: '100%', padding: '20px 20px 0px 20px'}}>
                <Grid item xs={12} sm={6} height="100%" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Card style={{width: '100%', height: '100%'}}>
                        <CardContent style={{...startAuctionImage, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button disabled={state.account === undefined} variant="contained" color="primary" onClick={() => dispatch({var: 'page', type: 'set', value: 'StartAuction'})}>Start Auction</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} height="100%" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Card style={{width: '100%', height: '100%'}}>
                        <CardContent style={{...joinAuctionImage, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button disabled={state.account === undefined} variant="contained" color="primary" onClick={() => dispatch({var: 'page', type: 'set', value: 'JoinAuction'})}>Join Auction</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    )
}