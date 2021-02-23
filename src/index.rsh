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
const Bet = {
    ...Defaults,
    placedBet: Fun([Address, UInt], Null),
    mayBet: Fun([UInt, UInt], Bool),
};

export const main =
    Reach.App(
        {},
        [
            ['Auctioneer', Auc], 
            ['class', 'Better', Bet]
        ],
        (Auctioneer, Better) => {
            const auctionEnds = (winnerAddress) => {
                each([Auctioneer, Better], () => {
                    interact.auctionEnds(winnerAddress);
                });
            };

            const getBet = (potBalance) => {
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
                .case(Better, (() => ({
                        when: declassify(interact.mayBet(getBet(currentPot), currentPot)),
                    })),
                    (() => getBet(currentPot)),
                    (() => {
                        const address = this;
                        const betValue = getBet(currentPot);
                        Better.only(() => interact.placedBet(address, currentPot + betValue));
                        Auctioneer.only(() => interact.updateBalance(currentPot + betValue));
                        return [ currentPot + betValue, true, address ];
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