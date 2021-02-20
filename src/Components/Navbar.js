import React from 'react';
import ConnectWallet from './ConnectWallet'

export default function Navbar() {

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
            </div>
            <ConnectWallet></ConnectWallet>
        </div>
    )
}