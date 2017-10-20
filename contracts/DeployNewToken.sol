pragma solidity ^0.4.13;
import './DayToken2.sol';

//Contract to deploy custom day tokens
contract DeployNewToken is Ownable {

  address public owner;
  address public dayTokenAddress;
  uint public dayTokenFees; //DAY tokens to be paid for deploying custom DAY contract
  event LogChildCreated(address creator, address child); // maybe listen for events
    

  function DeployNewToken(address _dayTokenAddress, uint _dayTokenFees) {
    dayTokenAddress = _dayTokenAddress;
    dayTokenFees = _dayTokenFees;
    owner = msg.sender;
  }

  function setDayTokenFees(uint _dayTokenFees) onlyOwner public {
    dayTokenFees = _dayTokenFees;
  }


  function createCustomDayToken(string _name, string _symbol, uint _maxAddresses, 
    uint _firstTeamContributorId, uint _totalTeamContributorIds, 
    uint _totalPostIcoContributorIds, uint256 _minMintingPower, uint256 _maxMintingPower, 
    uint _halvingCycle, uint256 _minBalanceToSell, uint _dayInSecs, 
    uint256 _teamLockPeriodInSec) public {
    
    address user = msg.sender;
    ERC20 dayToken = ERC20(dayTokenAddress);

    // transfer fees
    dayToken.transferFrom(user, this, dayTokenFees);

    DayToken2 newToken = new DayToken2(_name, _symbol, _maxAddresses,_firstTeamContributorId, 
      _totalTeamContributorIds, _totalPostIcoContributorIds, _minMintingPower, _maxMintingPower,
      _halvingCycle, _minBalanceToSell, _dayInSecs, _teamLockPeriodInSec);

    LogChildCreated(user, newToken); // emit an event

    // set minting agent
    newToken.setMintAgent(user, true);

    // set release agent
    newToken.setReleaseAgent(user);

    //set Upgrade master
    newToken.setUpgradeMaster(user);

    // transfer ownership
    newToken.transferOwnership(user);
  }

  // to collect all fees paid till now
  function fetchDayTokens() onlyOwner public {
    ERC20 dayToken = ERC20(dayTokenAddress);
    dayToken.transfer(owner, dayToken.balanceOf(this));
  }
}