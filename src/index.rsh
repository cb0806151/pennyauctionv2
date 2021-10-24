"reach 0.1";

const Defaults = {
  auctionEnds: Fun([Address], Null),
};
const Auc = {
  ...Defaults,
  getParams: Fun(
    [],
    Object({
      deadline: UInt,
      potAmount: UInt,
      initialAddress: Address,
    })
  ),
  updateBalance: Fun([UInt], Null),
};
const Bid = {
  placedBid: Fun([Bool], Tuple(Address, UInt)),
};

export const main = Reach.App(() => {
  const Auctioneer = Participant("Auctioneer", Auc);
  const Bidder = API("Bidder", Bid);
  deploy();

  const auctionEnds = (winnerAddress) => {
    Auctioneer.only(() => {
      interact.auctionEnds(winnerAddress);
    });
  };

  const getBid = (potBalance) => {
    return potBalance / 100;
  };

  Auctioneer.only(() => {
    const { deadline, potAmount, initialAddress } = declassify(
      interact.getParams()
    );
  });
  Auctioneer.publish(deadline, potAmount, initialAddress).pay(potAmount);

  const [currentPot, auctionRunning, winnerAddress] = 
    parallelReduce([potAmount,true,initialAddress])
    .invariant(balance() == currentPot)
    .while(auctionRunning)
    .api(Bidder.placedBid, 
        ((_) => getBid(currentPot)),
        ((canBid, k) => {
            const address = this;
            const bidValue = getBid(currentPot);
            const updatedPotValue = currentPot + bidValue;
            Auctioneer.only(() => interact.updateBalance(updatedPotValue));

            k([address, bidValue])

            return [updatedPotValue, true, address];
        })
    )
    .timeout(deadline, () => {
      Auctioneer.publish();
      return [currentPot, false, winnerAddress];
    });

  transfer(balance()).to(winnerAddress);
  auctionEnds(winnerAddress);
  commit();
});
