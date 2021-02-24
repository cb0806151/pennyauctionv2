import React, { useContext, useRef, useEffect } from 'react';
import { CoreState } from '../Util/CoreState';
import * as backend from '../build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';
import { getAddressWording } from '../Util/UtilityFunctions';


export default function Bidder() {
    const state = useContext(CoreState.State)
    const dispatch = useContext(CoreState.Dispatch)
    const yesButton = useRef();
    const noButton = useRef();

    useEffect(() => {
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

    const auctionEnds = async (winnerAddress) => {
        dispatch({var: 'lastBidAddress', type: 'set', value: winnerAddress})
        dispatch({var: 'page', type: 'set', value: 'AuctionEnd'})
    }

    const placedBid = async (attendeeAddress, potBalance) => {
        dispatch({var: 'lastBidAddress', type: 'set', value: attendeeAddress})
        dispatch({var: 'potAmount', type: 'set', value: fmt(potBalance)})
        if ( reach.addressEq(attendeeAddress, state.account) ) {
            const balance = await getBalance(state.account);
        }
    }

    const mayBid = async (bidAmount, potBalance) => {
        const translatedBidAmount = fmt(bidAmount);
        dispatch({var: 'bidAmount', type: 'set', value: translatedBidAmount})
        dispatch({var: 'mayBid', type: 'set', value: true})
        dispatch({var: 'potAmount', type: 'set', value: fmt(potBalance)})
        const balance = await getBalance(state.account);
        const mayBid = balance > translatedBidAmount;
        if (mayBid === false) return mayBid;
        const bidStatus = await new Promise(resolve => {
            yesButton.current.addEventListener('click', (e) => resolve(true), {'once': true})
            noButton.current.addEventListener('click', (e) => resolve(false), {'once': true})
        });
        dispatch({var: 'mayBid', type: 'set', value: false})
        return bidStatus;
    }


    const attach = (ctcInfoStr) => {
        const ctc = state.account.attach(backend, JSON.parse(ctcInfoStr));
        backend.Bidder(ctc, {auctionEnds, mayBid, placedBid});
    }

    return (
      <div style={container}>
            <h1>{getAddressWording(state.lastBidAddress, state.account.networkAccount.address)} made the last bid</h1>
            <h1>Current pot balance: {state.potAmount === 0 ? "...one moment please" : state.potAmount} {state.currencyAbbreviation}</h1>
            <hr/>
            {state.mayBid ? 
                <div>
                    <h1>Make a bid of {state.bidAmount} {state.currencyAbbreviation}?</h1>
                    <div>
                        <button ref={yesButton}>Yes</button>
                        <button ref={noButton}>No</button>
                    </div>
                </div>
            :
                <div>
                    <h1>...Waiting for next bidding cycle to start...</h1>
                </div>
            }            
      </div>
    )
}