import React from 'react';
import ConnectWallet from './ConnectWallet';
import Explanation from './Explanation';
import Button from '@material-ui/core/Button';

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var titleSpace = {
        color: 'white',
        flexGrow: 1,
        textAlign: 'left',
    };

    var navbar = {
        background: 'black',
        width: '100%',
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
    }

    return (
        <div style={navbar}>
            <div style={titleSpace}>
                <h1>The Reach Penny Auction</h1>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>What's a Penny Auction?</Button>
            </div>
            <ConnectWallet />
            <Explanation open={open} handleClose={() => handleClose()}></Explanation>
            
        </div>
    )
}