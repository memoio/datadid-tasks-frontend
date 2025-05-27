import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_URL: (() => {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8080';
      } else if (process.env.NODE_ENV === 'production') {
        return 'https://data-be.metamemo.one';
      } else {
        return 'https://data-be-v1.metamemo.one/';
      }
    })()
  }
};

export default nextConfig;
