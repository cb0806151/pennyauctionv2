# The Reach Penny Auction

A penny auction is a rather simple bidding game.
<br /><br />
An Auctioneer starts an auction by placing an initial amount in the pot and setting a deadline. Once the auction has started, they can send out invites.
<br /><br />
Attendees use those invites to join an auction and compete to be the first to bid 1% of the current pot in a series of rounds.
<br /><br />
After each bid the deadline is reset to its initial value. However, if it ticks all the way down the auction ends and the last Attendee to make a bid wins the pot.
<br /><br />

## Development Log

2/15/21
- create github repo
- establish create react app foundation
- establish reach foundation
- create 'connect wallet' button
- design prototype pages

2/16/21
- break designs down into components
- spa or multi page application? SPA
- download algo signer
- download and install forked algo signer
- test forked algo signer

2/17/21
- decide on what to use for state? built- in react state
- decide on format to use for spa? what was used in tut- 8
- functional components or classes? functional
- determine correct architecture (state, pages, utilities, etc)

2/18/21
- design and test the state architecture
- design and test the spa architecture
- design a rough approximation of the state
- Implement the nav bar component
- Implement the nav title
- Implement the connect wallet component

2/19/21
- add dropdown with functioning faucet to wallet component

2/20/21
- create tablet button component
- standardize component export pattern
- refactor state to allow for component updates

2/21/21
- create setter component
- create start auction page
- create join auction page
- create better page
- create auctioneer page
- create auction end page
- remove test page
- determine input value checking system

2/22/21
- create hovering message component
- set up first part of the auctioneer contract
- set up first part of the better contract
- refactor value setting page
- set up second part of the contract

2/23/21
- hook up pot amount displaying at end
- hook up winner address displaying at end
- create function that notifies the auctioneer of a change in the value of the pot
- hook up last bidder address displaying
- show auctioneers address as initial bid address
- show the initial pot amount
- show the amount the user will be bidding
- show the currency being used
- standardize usage of React.useContext or useContext
- display message noting that the user is waiting for the next bidding cycle

2/24/21
- rename better to bidder and related verbage
- install style library
- create explanation of a penny auction 
- Display alert when bid fails
- style navbar
- style connect wallet
- style message notice
- style home page

2/25/21
- style start auction page
- style join auction page
- style bidder page
- style auctioneer page
- style auction ends page
- update balance after bid is placed

2/26/21
- create test file
- implement prettier
- check if mayBet needs the potbalance

2/27/21
- update readme
- put designs into the repository
- put currency abbreviation on the StartAuction page  
- put notice about block time near the deadline entry on the StartAuction page  
- disable autocomplete on input fields  

3/2/21
- add extra line inbetween exit and winner on AuctionEnds page  
- fix decimal value trim error  

display a popup message when an input is invalid  
get rid of the 'don't bid' button  
integrate the algorand network  
record the video explanation  
<br><br>

## Edgecases:
- If the contract has ended and a bidder was still being asked if they want to bid, then they run the risk of sending the bid the bid to a dead contract (ie. losing their bid) if they do bid. This is because the check for their bid is a promise and they won't be notified of the contract closing until after that promise resolves
- If the contract has ended and a user inputs the invite, then there is no way to catch the error that will result
<br><br>

## Notes
- Build it to work with ETH first and then change over the connector and faucet to ALGO once its done

