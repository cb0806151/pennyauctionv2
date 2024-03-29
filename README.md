# The Reach Penny Auction  

<details><summary>Description</summary>
<p>
A penny auction is a rather simple bidding game.  
An Auctioneer starts an auction by placing an initial amount in the pot and setting a deadline. Once the auction has started, they can send out invites.  
Bidders use those invites to join an auction and compete to be the first to bid 1% of the current pot in a series of rounds.  
After each bid the deadline is reset to its initial value. However, if it ticks all the way down the auction ends and the last Bidder to make a bid wins the pot.  
</p>
</details>
<details><summary>Environment Setup Instructions</summary>
<p>

- clone the repository
- open a terminal to the `pennyauctionv2` folder 
- from there run the command `yarn install`
- once that has completed run `cd src`
- (if on Windows) run the `wsl` command to switch over to linux
- run the `curl https://raw.githubusercontent.com/reach-sh/reach-lang/master/reach -o reach ; chmod +x reach` command to download reach into the src folder
- run the `./reach version` command to ensure it installed
- run the `./reach compile` command to build the contract
- run the `./reach devnet` command (can also be run with `REACH_CONNECTOR_MODE=ALGO ./reach devnet` if the stdlib imports are swapped)
- start up a new terminal and navigate to the `pennyauctionv2` folder 
- now run the `yarn start` command to run the application

</p>
</details>
<details><summary>Development Log</summary>
<p>

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

3/8/21
- get rid of the 'don't bid' button  
- display a popup message when an input is invalid  
- update readme with setup instructions  

3/9/21
- allow manually setting the deadline

3/10/21
- record 4/5 of the demo video

3/11/21
- integrate the algorand network  
- fix application title  
- get loading button for contract deploy  
- check balance before submitting contract  
- get favicon  
- standardize naming of standard library import  
- update in-app balances on auction end  
- change structure to only fetch balance when opening wallet dropdown  
- show loading bar when depositing funds  
- fix text glitch when the bidder joins a contract  
- record the rest of the demo video  

Post-competition

3/15/2021
- fix readme environment setup instructions  
- switch to ETH for `./reach devnet` testing  
- consolidate environment setup instructions  

</p>
</details>
<details><summary>Edgecases</summary>
<p>  

- If the contract has ended and a bidder was still being asked if they want to bid, then they run the risk of sending the bid the bid to a dead contract (ie. losing their bid) if they do bid. This is because the check for their bid is a promise and they won't be notified of the contract closing until after that promise resolves
    - This edgecase is a metamask artifact ^
- If the contract has ended and a user inputs the invite, then there is no way to catch the error that will result  

</p>
</details>

