const Block = require('./block')
const sha256 = require('js-sha256')

class Blockchain {

  constructor(genesisBlock, users) {
    this.blocks = []
    this.users = users
    this.addBlock(genesisBlock)
  }

  addBlock(block) {
    if (this.blocks.length == 0) {
      block.previousHash = "0000000000000000"
      block.hash = this.generateHash(block)
    }
    this.blocks.push(block)
  }

  getNextBlock(transactions) {
    const block = new Block()
    transactions.forEach(function (transaction) {
      block.addTransaction(transaction)
    })
    const previousBlock = this.getPreviousBlock()
    block.index = this.blocks.length
    block.previousHash = previousBlock.hash
    block.hash = this.generateHash(block)
    return block
  }

  generateHash(block) {
    let hash = sha256(block.key)
    while (!hash.startsWith("00")) {
      block.nonce += 1
      hash = sha256(block.key)
    }
    return hash
  }

  getBalance(address) {
    let balance = null;
    for (const user of this.users) {
      if (user.address === address) balance = user.balance
    }
    if (balance === null) {
      return 'Not Found User';
    }
    for (const block of this.blocks) {
      for (const transactions of block.transactions) { 
        if (transactions.from === address) {
          balance -= transactions.amount;
        }
        if (transactions.to === address) {
          balance += transactions.amount;
        }
      }
    }
    return balance;
  }

  getPreviousBlock() {
    return this.blocks[this.blocks.length - 1]
  }

}

module.exports = Blockchain
