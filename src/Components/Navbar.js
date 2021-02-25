import React from 'react';
import ConnectWallet from './ConnectWallet';
import Explanation from './Explanation';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    The Reach Penny Auction
                </Typography>
                <Button variant="outlined" color="inherit" onClick={handleClickOpen} style={{marginRight: '20px'}}>What's a Penny Auction?</Button>
                <ConnectWallet />
                </Toolbar>
            </AppBar>
            <Explanation open={open} handleClose={() => handleClose()}></Explanation>
            
        </div>
    )
}