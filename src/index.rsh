'reach 0.1';

const Defaults = {
    auctionEnds: Fun([Address], Null),
};
const Auc = {
    ...Defaults,
    getParams: Fun([], Object({
        deadline: UInt,
        potAmount: UInt,
        potAddress: Address,
    })), 
    updateBalance: Fun([UInt], Null),
};
const Bid = {
    ...Defaults,
    placedBid: Fun([Address, UInt], Null),
    mayBid: Fun([UInt, UInt], Bool),
};

export const main =
    Reach.App(
        {},
        [
            Participant('Auctioneer', Auc), 
            ParticipantClass('Bidder', Bid)
        ],
        (Auctioneer, Bidder) => {
            const auctionEnds = (winnerAddress) => {
                each([Auctioneer, Bidder], () => {
                    interact.auctionEnds(winnerAddress);
                });
            };

            const getBid = (potBalance) => {
                return potBalance / 100;
            };

            Auctioneer.only(() => {
                const { deadline, potAmount, potAddress } =
                  declassify(interact.getParams());
            });
            Auctioneer.publish(deadline, potAmount, potAddress)
                    .pay(potAmount);

            const [ currentPot, auctionRunning, winnerAddress ] =
                parallel_reduce([ potAmount, true, potAddress ])
                .invariant(balance() == currentPot)
                .while(auctionRunning)
                .case(Bidder, (() => ({
                        when: declassify(interact.mayBid(getBid(currentPot), currentPot)),
                    })),
                    (() => getBid(currentPot)),
                    (() => {
                        const address = this;
                        const bidValue = getBid(currentPot);
                        Bidder.only(() => interact.placedBid(address, currentPot + bidValue));
                        Auctioneer.only(() => interact.updateBalance(currentPot + bidValue));
                        return [ currentPot + bidValue, true, address ];
                    }))
                .timeout(3, () => {
                    Auctioneer.publish();
                    return [ currentPot, false, winnerAddress ];
                    });
                        
            transfer(balance()).to(winnerAddress);
            auctionEnds(winnerAddress);
            commit();
        }
    );