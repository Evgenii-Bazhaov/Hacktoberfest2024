import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-ignition"

require("dotenv").config()

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        ganache: {
            url: process.env.PROVIDER_URL,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
    },
}

export default config
