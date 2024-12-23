"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { API_URL } from "@/app/components/config/config";

// Create the context
const UserContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const { isConnected, address } = useAccount();
  const [userInfo, setUserInfo] = useState(null);
  // const [didInfo, setDidInfo] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      // 调用绑定钱包接口
      const bindWallet = async () => {
        try {
          const response = await axios.post(
            API_URL.AIRDROP_USER_WALLET_BIND,
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
              uid: response.data.data.uid,
              token: response.data.data.token,
            });
          } else {
            alert("Failed to bind wallet:", response.data);
          }
        } catch (error) {
          alert("Error binding wallet:", error);
        }
      };

      bindWallet();
    }
  }, [isConnected, address]);
  console.log(userInfo);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
