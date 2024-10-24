const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
//updated web3 and hdwallet-provider imports added for convenience
const { interface, bytecode } = require("./compile");

// deploy code will go here
const provider = new HDWalletProvider(
  "${ACCOUNT MNEMONIC}",
  "${INFURIA ADDRESS}"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from account: ", accounts[0]);

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hello Ethereum!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployment address: ", inbox.options.address);
  provider.engine.stop();
};

deploy();
