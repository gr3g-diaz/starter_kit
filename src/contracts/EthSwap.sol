pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    // payable allows us to send ether
    function buyTokens() public payable {
        // Redemption rate = # of tokens they receive for 1 ether.
        // Amount of Ethereum * Redemption rate.
        // Unsigned integer is a POSITIVE int with no decimal places.
        uint tokenAmount = msg.value * rate;
        // msg is a global variable in solidity and sender is address. 
        token.transfer(msg.sender, tokenAmount);


        //Emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);

    }

}