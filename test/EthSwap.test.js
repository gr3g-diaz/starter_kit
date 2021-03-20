/*
Test frame works used are Mocha and Chai - built into truffle.
 */

const { assert } = require('chai');
const { default: Web3 } = require('web3');
const Token = artifacts.require('Token')
const EthSwap = artifacts.require("EthSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    // web 3 utility that allows you to talk to the blockchain.
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', (accounts) => {
    let token, ethSwap

    before(async ()=> {
        token = await Token.new()
        ethSwap = await EthSwap.new()
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap Instant Exchange');
        });
    });

    describe('Token deployment', async () => {
        it('contract has a name', async () => {
            const name = await token.name();
            assert.equal(name, 'DApp Token');
        });
    });

    it('contract has tokens', async () => {
        let balance = await token.balanceOf(ethSwap.address);
        assert.equal(balance.toString(),tokens('1000000'))
    });

})