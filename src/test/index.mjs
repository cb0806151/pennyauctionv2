import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const thread = async (f) => await f();

const numberOfBidders = 2;

(async () => {
    const stdlib = await loadStdlib({REACH_DEBUG: 'yes'});
    const walletBalance = stdlib.parseCurrency(10);
    const auctioneerAccount = await stdlib.newTestAccount(walletBalance);
    const bidderAccounts = await Promise.all( Array.from({length: numberOfBidders}, () => stdlib.newTestAccount(walletBalance)));

    const format = (x) => stdlib.formatCurrency(x, 4);
    const getBalance = async (who) => format(await stdlib.balanceOf(who));
    
    const ctcAuctioneer = auctioneerAccount.contract(backend);
    const ctcInfo = ctcAuctioneer.getInfo();

    const formatAddress = (addressOrAccount) => {
        let address = addressOrAccount;
        if (typeof address !== "string") address = addressOrAccount.networkAccount.address
        return address.substring(0, 5);
    }

    const Defaults = (account) => ({
        auctionEnds: (winnerAddress) => {
            if (stdlib.addressEq(winnerAddress, account)) {
                console.log(`${formatAddress(winnerAddress)} sees that they won the auction`);
            } else {
                console.log(`${formatAddress(account)} sees that ${formatAddress(winnerAddress)} won the auction!`)
            }
        }
    })

    const user = async (uid) => {
        const acc = await stdlib.newTestAccount(walletBalance);
        acc.setDebugLabel(uid);
        return async () => {
            const ctc = acc.contract(backend, ctcAuctioneer.getInfo());
            const put = ctc.a.Bidder;

            const placeBid = async () => {
                try {
                    const [userAddress, bid] = await put.placedBid(true)
                    console.log(uid, formatAddress(acc), `bid ${format(bid)} ETH`)
                } catch (e) {
                    console.log(e)
                    console.log(`${uid} (${formatAddress(acc)}) didn't bid in time!`)
                }
            }

            if ( Math.random() <= Math.random() ) await stdlib.wait(1);
            await placeBid()
            await stdlib.wait(1);
            await stdlib.wait(1);
            await stdlib.wait(1);
            await stdlib.wait(1);
            await stdlib.wait(1);
            await stdlib.wait(1);
        }
    }

    await Promise.all([
        backend.Auctioneer(ctcAuctioneer, {
            ...Defaults(auctioneerAccount),
            getParams: () => ({
                    deadline: 5,
                    potAmount: stdlib.parseCurrency(1),
                    initialAddress: auctioneerAccount,
            }),
            updateBalance: (currentPotBalance) => {
                console.log(`The Auctioneer sees that the pot is now ${format(currentPotBalance)}`);
            },
        }),
        thread(await user('Alice')),
        // thread(await user('Bob')),
    ])
    // .concat(
    //     bidderAccounts.map((bidderAccount, i) => {
    //         const ctcBidder = bidderAccount.contract(backend, ctcInfo);

    //         return backend.Bidder(ctcBidder, {
    //             ...Defaults(bidderAccount),
    //             placedBid: (bidderAddress, currentPotBalance) => {
    //                 if (stdlib.addressEq(bidderAddress, bidderAccount)) {
    //                     console.log(`${formatAddress(bidderAddress)} placed a bid, bringing the current pot balance up to ${format(currentPotBalance)}`);
    //                 } else {
    //                     console.log(`${formatAddress(bidderAccount)} saw that ${formatAddress(bidderAddress)} placed a bid, bringing the current pot balance up to ${format(currentPotBalance)}`);
    //                 }
    //             },
    //             mayBid: async (bidAmount, currentPotBalance) => {
    //                 const walletBalance = await getBalance(bidderAccount);
    //                 const mayBet = (walletBalance > format(bidAmount)) && (Math.random() > 0.25);
    //                 return mayBet;
    //             }
    //         })
    //     })
    // ))
})();