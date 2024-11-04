import { counterABI, hookMinerABI, poolManagerABI, poolModifyLiquidityTestABI, poolSwapTestABI } from "./generated";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export const deployedContracts: GenericContractsDeclaration = {
  421614: [
    {
      name: "Arbitrum Sepolia",
      chainId: "421614",
      contracts: {
        PoolManager: {
          address: "0xb673AE03413860776497B8C9b3E3F8d4D8745cB3",
          abi: poolManagerABI,
        },
        Counter: {
          address: "0x3309c7120aa95225a7f04d7487ca2ddf12337b83",
          abi: counterABI,
        },
        HookMiner: {
          address: "0xa96ce04edc1f397740e9a79d48dbf29d6fcd4c37",
          abi: hookMinerABI,
        },
        PoolModifyLiquityTest: {
          address: "0x30654C69B212AD057E817EcA26da6c5edA32E2E7",
          abi: poolModifyLiquidityTestABI,
        },
        PoolSwapTest: {
          address: "0x24C731645ee1e35C3219153d370EBd79784D1E91",
          abi: poolSwapTestABI,
        },
      },
    },
  ],
};

export default deployedContracts;
