import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DID_SERVER_URL: (() => {
      if (process.env.NODE_ENV === 'development') {
        return 'https://didapi.memolabs.org/did';
      } else if (process.env.NODE_ENV === 'test') {
        return 'https://testdidapi.memolabs.org/did';
      } else {
        return 'https://didapi.memolabs.org/did';
      }
    })(),

    AIRDROP_BACKEND_URL: (() => {
      if (process.env.NODE_ENV === 'development') {
        return 'https://apapitest.memoscan.org/api';
      } else {
        return 'https://apapi.memoscan.org/api';
      }
    })()
  }
};

export default nextConfig;
