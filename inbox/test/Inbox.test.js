const ganache = require("ganache");
const { Web3 } = require("web3");
// updated ganache and web3 imports added for convenience
const assert = require("assert");
const { interface, bytecode } = require("../compile");

// contract test code will go here
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
let initialString = "Test string1";

beforeEach(async () => {
  // Get all accounts
  accounts = await web3.eth.getAccounts();

  // Compile contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [initialString],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys the contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default value", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialString);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("New string2").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "New string2");
  });
});
