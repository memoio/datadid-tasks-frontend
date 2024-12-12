"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const { isConnected, address } = useAccount();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      // 调用绑定钱包接口
      const bindWallet = async () => {
        try {
          const response = await axios.post(
            "https://airdrop.7nc.top/api/user/wallet/bind",
            {
              walletAddress: address,
            },
            {
              headers: {
                accept: "application/hal+json",
                uid: "11735283", // 根据您的实际情况传入 uid
                token: "37595d3a6e43876682b37cdcf941938e", // 根据您的实际情况传入 token
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.result === 1) {
            setUserInfo({
              uid: "22980883",
              token: "825c4b5289376b91864bbf67fe5694f9",
            });
          } else {
            console.error("Failed to bind wallet:", response.data);
          }
        } catch (error) {
          console.error("Error binding wallet:", error);
        }
      };

      bindWallet();
    }
  }, [isConnected, address]);
  console.log(userInfo);
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw an error if the hook is used outside the provider
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
