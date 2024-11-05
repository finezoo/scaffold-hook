import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains } from "wagmi";
import * as chains from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import scaffoldConfig from "~~/scaffold.config";
import { burnerWalletConfig } from "~~/services/web3/wagmi-burner/burnerWalletConfig";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const configuredNetwork = getTargetNetwork();
const { onlyLocalBurnerWallet } = scaffoldConfig;

const arbitrumSepolia = {
  id: 421614,
  name: "Arbitrum Sepolia",
  network: "arbitrum-sepolia",
  nativeCurrency: {
    name: "Arbitrum Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rollup.arbitrum.io/rpc"],
    },
    public: {
      http: ["https://sepolia-rollup.arbitrum.io/rpc"],
    },
  },
  blockExplorers: {
    etherscan: { name: "Arbiscan", url: "https://sepolia.arbiscan.io/" },
    default: { name: "Arbiscan", url: "https://sepolia.arbiscan.io/" },
  },
  testnet: true,
};

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = [arbitrumSepolia, chains.sepolia];

/**
 * Chains for the app
 */
export const appChains = configureChains(
  enabledChains,
  [
    alchemyProvider({
      apiKey: scaffoldConfig.alchemyApiKey,
    }),
    publicProvider(),
  ],
  {
    // We might not need this checkout https://github.com/scaffold-eth/scaffold-eth-2/pull/45#discussion_r1024496359, will test and remove this before merging
    stallTimeout: 3_000,
    // Sets pollingInterval if using chain's other than local hardhat chain
    ...(configuredNetwork.id !== chains.hardhat.id
      ? {
          pollingInterval: scaffoldConfig.pollingInterval,
        }
      : {}),
  },
);

const walletsOptions = { chains: appChains.chains, projectId: scaffoldConfig.walletConnectProjectId };
const wallets = [
  metaMaskWallet({ ...walletsOptions, shimDisconnect: true }),
  walletConnectWallet(walletsOptions),
  ledgerWallet(walletsOptions),
  braveWallet(walletsOptions),
  coinbaseWallet({ ...walletsOptions, appName: "scaffold-eth-2" }),
  rainbowWallet(walletsOptions),
  ...(configuredNetwork.id === chains.hardhat.id || !onlyLocalBurnerWallet
    ? [burnerWalletConfig({ chains: [appChains.chains[0]] })]
    : []),
  safeWallet({ ...walletsOptions, debug: false, allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/] }),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets,
  },
]);
