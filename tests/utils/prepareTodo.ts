import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"

export async function prepareSigners(thisObject: Mocha.Context) {
    thisObject.signers = await ethers.getSigners()
    thisObject.bob = thisObject.signers[0];
}

export async function prepareTodoList(thisObject: Mocha.Context, signer: SignerWithAddress) {
    const Factory = await ethers.getContractFactory("TodoList");
    const todo = await Factory.connect(signer).deploy();
    await todo.deployed();
    thisObject.todo = todo;
}
