'use client';

import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  bsc
} from 'wagmi/chains';

const memoriae = {
  id: 985,
  name: 'Memo Megrez',
  iconUrl: "https://chainid.network/static/6071898808832085d8e37c29493ab0e3/927d1/memo.webp",
  rpcUrls: {
    default: {
      http: ["https://chain.metamemo.one:8501"],
    }
  },
  nativeCurrency: {
    name: 'Memo Megrez',
    symbol: 'CMEMO',
    decimals: 10,
  },
} as const as Chain;

export const config = getDefaultConfig({
  appName: 'did',
  projectId: 'a4c0191a67edd0463e46fc2c3380a3f8',
  chains: [
    memoriae,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,

    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

