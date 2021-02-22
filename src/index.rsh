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

            Auctioneer.only(() => {
                const { deadline, potAmount, potAddress } =
                  declassify(interact.getParams());
            });
            Auctioneer.publish(deadline, potAmount, potAddress)
                    .pay(potAmount);
                        
            transfer(balance()).to(potAddress);
            auctionEnds();
            commit();
        }
    );