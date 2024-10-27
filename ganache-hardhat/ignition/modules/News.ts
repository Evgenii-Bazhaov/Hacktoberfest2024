import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NewsModule = buildModule("NewsModule", (m) => {

  const News = m.contract("NewsContract", []);

  return { News };
});

export default NewsModule;
