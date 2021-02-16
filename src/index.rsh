'reach 0.1';

export const main =
    Reach.app(
        {},
        [
            ['Auctioneer', {}], 
            ['Better', {}]
        ],
        (Auctioneer, Better) => {
            exit();
        }
    );