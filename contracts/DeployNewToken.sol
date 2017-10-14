pragma solidity ^0.4.13;
import './DayToken.sol';

contract DeployNewToken {

  address owner;
  address[] public children; // public, list, get a child address at row #
  event LogChildCreated(address child); // maybe listen for events
    
    string public _name; 

    string public _symbol; 

    uint8 public _decimals; 
 
    
    /* Stores the id of the first team TimeMint */
    uint256 public _firstTeamContributorId;

    /* Stores the total team TimeMints */
    uint256 public _totalTeamContributorIds;

    /* Stores total Post ICO TimeMints (for auction) */
    uint256 public _totalPostIcoContributorIds;

    /* Maximum number of address */
    uint256 public _maxAddresses;

    /* Min Minting power with 19 decimals: 0.5% : 5000000000000000000 */
    uint256 public _minMintingPower;

    /* Max Minting power with 19 decimals: 1% : 10000000000000000000 */
    uint256 public _maxMintingPower;

    /* Halving cycle in days (88) */
    uint256 public _halvingCycle; 

    /* Minimum Balance in Day tokens required to sell a minting address */
    uint256 public _minBalanceToSell;

    /* Team address lock down period from issued time, in seconds */
    uint256 public _teamLockPeriodInSec;  //Initialize and set function

    /* Duration in secs that we consider as a day. (For test deployment purposes, 
       if we want to decrease length of a day. default: 84600)*/
    uint256 public _dayInSecs;

    bool public _mintable;

    uint public _initialSupply;

  function DeployNewToken() {
    owner = msg.sender;
  }

  function createChild(string _name, string _symbol, uint _maxAddresses, uint _firstTeamContributorId, uint _totalTeamContributorIds, 
        uint _totalPostIcoContributorIds, uint256 _minMintingPower, uint256 _maxMintingPower, uint _halvingCycle, 
        uint256 _minBalanceToSell, uint256 _teamLockPeriodInSec) {
    DayToken newToken = new DayToken(_name, _symbol, _maxAddresses,_firstTeamContributorId, _totalTeamContributorIds, _totalPostIcoContributorIds, _minMintingPower, _maxMintingPower, _halvingCycle, _minBalanceToSell, _teamLockPeriodInSec);
    LogChildCreated(newToken); // emit an event - another way to monitor this
    children.push(newToken);
}