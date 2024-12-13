"use client";

"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

// Create the context
const DIDContext = createContext();

// Create the provider component
export const DIDContextProvider = ({ children }) => {
  const { isConnected, address } = useAccount();
  const [didInfo, setDIDInfo] = useState(null);
  // const [didInfo, setDidInfo] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      const getDIDInfo = async () => {
        try {
          const response = await axios.get(
            "http://119.147.213.61:38082/did/info",
            {
              params: {
                address,
              },
            }
          );

          if (response.code === 200) {
            console.log("didinfo:", response.data);
            setDIDInfo({
              did: response.data.did,
              number: response.data.number,
            });
          }
        } catch (error) {
          console.error("Error binding wallet:", error);
        }
      };

      getDIDInfo();
      console.log("didinfo did", didInfo);
    }
  }, [isConnected, address]);

  return (
    <DIDContext.Provider value={{ didInfo, setDIDInfo }}>
      {children}
    </DIDContext.Provider>
  );
};

export const useDIDInfo = () => {
  return useContext(DIDContext);
};
