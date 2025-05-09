import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_URL: (() => {
       if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8080';
      } else {
        return 'https://data-be.metamemo.one/v1';
      }
    })()
  }
};

export default nextConfig;
