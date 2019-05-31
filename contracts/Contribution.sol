pragma solidity >=0.4.21 <0.6.0;

import './Token.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Contribution{
using SafeMath for uint256;
    //@dev amount of ether donated for each address
    mapping(address=>uint) private userEtherDonated;
    uint private ethToTokenRate;
    Token private tokenContractReference;
    event DonationMade(address donator,uint amountDonated,uint tokensAquired);

    constructor(address _tokenReference, uint _ethToTokenRate) public{
        tokenContractReference = Token(_tokenReference);
        ethToTokenRate = _ethToTokenRate;
    }
    //@notice assuming donating 1ether will return 1 token
    //@dev function first checks if the amount is not 0, then adds amount to 'userEtherDonated' mapping then returns the tokens
    //@param amountInEther is the amount currently being donated in Ether
    //@return returns tokens obtained from donation and emits 'DonationMade' event only when donation is successful
    function donate(uint amountInEther) external payable{
        require(amountInEther != 0, 'You donated 0 ether, hence nothing was done :(');
        userEtherDonated[msg.sender] = userEtherDonated[msg.sender].add(amountInEther);
        uint tokensToGet = tokensToMint(amountInEther);
        require(tokenContractReference.transfer(msg.sender,tokensToGet),"Token transfer failed");
        emit DonationMade(msg.sender,amountInEther,tokensToGet);
    }

    //@dev view function that returns amount donated by an address
    //@param walletAddress is the address of the user that has donated
    //@return returns amount donated from the private mapping 'userEtherDonated'
    function getDonationByAddress(address walletAddress) public view returns(uint){
        return userEtherDonated[walletAddress];
    }

    //@dev get the address of the Token contract that this contract refers to
    function getTokenContractAddress() public view returns(address) {
	return address(tokenContractReference);
    }

    //@dev a private view function that converts ether to tokens to be minted
    function tokensToMint(uint amountInEther) private view returns(uint) {
        return ethToTokenRate.mul(amountInEther);
    }
}