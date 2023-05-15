require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const bc9bb704825749559c722adaef4d86d5 = "bc9bb704825749559c722adaef4d86d5";

module.exports = {
  solidity: {
    version: '0.8.11',
    networks: {
      sepolia: {
        url: `https://sepolia.infura.io/v3/bc9bb704825749559c722adaef4d86d5`,
        accounts: bc9bb704825749559c722adaef4d86d5
      }
    }
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
}
