'reach 0.1';

const Defaults = {
    auctionEnds: Fun([], Null),
};
const Auc = {
    ...Defaults,
    getParams: Fun([], Object({
        deadline: UInt,
        potAmount: UInt,
        potAddress: Address,
    })), 
};
const Bet = {
    ...Defaults,
    placedBet: Fun([Address, UInt], Null),
    mayBet: Fun([UInt], Bool),
};

export const main =
    Reach.App(
        {},
        [
            ['Auctioneer', Auc], 
            ['class', 'Better', Bet]
        ],
        (Auctioneer, Better) => {
            const auctionEnds = () => {
                each([Auctioneer, Better], () => {
                    interact.auctionEnds();
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
                        when: declassify(interact.mayBet(getBet(currentPot))),
                    })),
                    (() => getBet(currentPot)),
                    (() => {
                        const address = this;
                        const betValue = getBet(currentPot);
                        Better.only(() => interact.placedBet(address, betValue));
                        return [ currentPot + betValue, true, address ];
                    }))
                .timeout(3, () => {
                    Auctioneer.publish();
                    return [ currentPot, false, winnerAddress ];
                    });
                        
            transfer(balance()).to(winnerAddress);
            auctionEnds();
            commit();
        }
    );