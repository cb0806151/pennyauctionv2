'reach 0.1';

export const main =
    Reach.App(
        {},
        [
            ['Auctioneer', {}], 
            ['Better', {}]
        ],
        (Auctioneer, Better) => {
            exit();
        }
    );