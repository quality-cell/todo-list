import { HardhatRuntimeEnvironment } from 'hardhat/types';

module.exports = async function (hre: HardhatRuntimeEnvironment) {
   
    const { deployments, getNamedAccounts, ethers } = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    console.log(`Deployer: ${deployer}`);
    
    await deploy('TodoList', {
        from: deployer,
        log: true,
    });
};
module.exports.tags = ['TodoList'];