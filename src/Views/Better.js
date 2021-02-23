import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import * as backend from '../build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';


export default function Better() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)
    const yesButton = React.createRef();
    const noButton = React.createRef();

    React.useEffect(() => {
        console.log(state.inviteLink)
        attach(state.inviteLink)
    }, [])

    const container = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '200px',
    }

    const fmt = (x) => reach.formatCurrency(x, 4);
    
    const getBalance = async (who) => fmt(await reach.balanceOf(who));

    const auctionEnds = async () => {
        console.log("The auction has finished!");
        dispatch({var: 'page', type: 'set', value: 'AuctionEnd'})
    }

    const placedBet = async (attendeeAddress, betAmount) => {
        if ( reach.addressEq(attendeeAddress, state.account) ) {
            const balance = await getBalance(state.account);
            console.log(`${attendeeAddress} bet: ${fmt(betAmount)} leaving their balance at ${balance}`);
        }
    }

    const mayBet = async (betAmount) => {
        console.log("gonna bet?")
        const balance = await getBalance(state.account);
        const mayBet = balance > fmt(betAmount);
        if (mayBet === false) return mayBet;
        const betStatus = await new Promise(resolve => {
            yesButton.current.addEventListener('click', (e) => resolve(true), {'once': true})
            noButton.current.addEventListener('click', (e) => resolve(false), {'once': true})
        });
        return betStatus;
    }


    const attach = (ctcInfoStr) => {
        const ctc = state.account.attach(backend, JSON.parse(ctcInfoStr));
        backend.Better(ctc, {auctionEnds, mayBet, placedBet});
    }

    return (
      <div style={container}>
            <h1>{state.lastBidAddress} made the last bid</h1>
            <h1>Current pot balance: {state.balance}</h1>
            <hr/>
            <h1>Make a bet?</h1>
            <div>
                <button ref={yesButton}>Yes</button>
                <button ref={noButton}>No</button>
            </div>
      </div>
    )
}