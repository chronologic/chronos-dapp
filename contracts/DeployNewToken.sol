pragma solidity ^0.4.13;
import './DayToken.sol';

contract DeployNewToken {

  address owner;
  address[] public children; // public, list, get a child address at row #
  event LogChildCreated(address child); // maybe listen for events
    

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
}