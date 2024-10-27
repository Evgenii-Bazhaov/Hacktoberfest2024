import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VotingModule = buildModule("VotingModule", (m) => {

  const voting = m.contract("VotingContract", [["Rohan", "Sayan", "Sandip"]]);

  return { voting };
});

export default VotingModule;
