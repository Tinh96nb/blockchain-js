
const Block = require('./models/block')
const Transaction = require('./models/transaction')
const Blockchain = require('./models/blockchain')

// create genesis block
const genesisBlock = new Block()
const initUsers = [
  { 'address': '01', 'balance': 20 },
  { 'address': '02', 'balance': 20 },
  { 'address': '03', 'balance': 10 },
];
const blockchain = new Blockchain(genesisBlock, initUsers)


// block 1 - 2 transaction
const t1 = new Transaction('01', '02', 10)
const t2 = new Transaction('02', '03', 10)

const block1 = blockchain.getNextBlock([t1, t2])
blockchain.addBlock(block1)

// block 2 - 1 transaction
const t3 = new Transaction("02", "03", 10)
const block2 = blockchain.getNextBlock([t3])
blockchain.addBlock(block2)

console.log(blockchain.blocks)
console.log('--------------------------');
for (const user of initUsers) {
  const balance = blockchain.getBalance(user.address);
  console.log(`Tien trong vi cua ${user.address} con lai la:`, balance);
}
console.log('--------------------------');
