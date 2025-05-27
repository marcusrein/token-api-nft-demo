import { createContext, useContext, useState } from "react";

export const SUPPORTED_CHAINS = {
  mainnet: { name: "Ethereum Mainnet", id: "mainnet", icon: "⟠" },
  bsc: { name: "BNB Smart Chain", id: "bsc", icon: "⛓️" },
  base: { name: "Base", id: "base", icon: "🔵" },
  "arbitrum-one": { name: "Arbitrum One", id: "arbitrum-one", icon: "🔷" },
  optimism: { name: "Optimism", id: "optimism", icon: "🔴" },
  matic: { name: "Polygon", id: "matic", icon: "⬡" },
  unichain: { name: "Unichain", id: "unichain", icon: "🦄" },
};

const ChainContext = createContext();

export function ChainProvider({ children }) {
  const [selectedChain, setSelectedChain] = useState("mainnet");

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
}

export function useChain() {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
}
