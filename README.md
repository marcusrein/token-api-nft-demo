<p align="center">
  <img src="public/dashboard.png" alt="NFT Portfolio Dashboard" width="600"/>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Built%20with-Next.js-blue" alt="Next.js"/></a>
  <a href="https://chakra-ui.com/"><img src="https://img.shields.io/badge/UI-Chakra%20UI-29c7ac" alt="Chakra UI"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License"/></a>
</p>

# The Graph's Token API - NFT Portfolio Dashboard Demo

A modern, multi-chain NFT portfolio dashboard built with Next.js, Chakra UI, and The Graph Token API. Explore wallet holdings, top holders, collection stats, recent sales, and on-chain activity for any Ethereum address or ENS name.

---

## 🚀 Features

- ENS & address lookup for NFT holdings
- Collection explorer: stats, holders, sales, activity
- Powered by [Token API](https://thegraph.com/docs/en/token-api/quick-start/)
- Responsive, clean UI (Chakra UI)
- Multi-chain ready (Ethereum mainnet only for now; others coming soon)
- **All UI components are copy-paste ready** for use in your own projects!

---

## 🛠️ Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/marcusrein/nft-portfolio-dashboard.git
   cd nft-portfolio-dashboard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Configure environment variables:**
  Add your JWT Key gathered from [The Graph Market](https://thegraph.market/) and your The Graph Network API Key from [Subgraph Studio](https://www.thegraph.com/studio)
   ```bash
   # Edit .env.local and set:
   NEXT_PUBLIC_TOKEN_API_JWT_KEY=your_token_api_jwt_here
   NEXT_PUBLIC_THE_GRAPH_NETWORK_API_KEY=your_graph_network_api_key_here
   ```

4. **Run the app:**
   ```bash
   pnpm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000)**

---

## 🗂️ Project Structure

```
src/
  ├── components/     # Reusable UI widgets (WalletCard, CollectionStatsBadge, ...)
  ├── hooks/          # Custom React hooks
  ├── lib/            # Token API helpers
  └── pages/          # Next.js pages
```

---

## 📦 Copy-and-Paste Component Kit

All UI widgets live in `src/components` and their helpers (`src/hooks`, `src/utils`, `src/lib`).  A single barrel file exposes everything so you can do:

```js
import { NFTWalletHoldings, CollectionStatsBadge } from "../path-to-this-repo/src";
```

To drop any component into **another** Next.js / React project you only need:

1. The component file (or just `src` folder).
2. The peer packages listed below.
3. These two env vars in a `.env.local` file so the Token API can authenticate:

```
NEXT_PUBLIC_TOKEN_API_JWT_KEY=<your_market_jwt>
NEXT_PUBLIC_THE_GRAPH_NETWORK_API_KEY=<your_network_key>
```

### Peer dependencies

```
react >= 18
next >= 14
@chakra-ui/react @emotion/react @emotion/styled framer-motion
@tanstack/react-query (or react-query v3)
axios
dayjs
```

Wrap your root in Chakra UI + React-Query providers:

```jsx
// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
```

Now copy any widget, pass in the required props (e.g. `address`, `contract`), and it will just work.

---

## 📝 License

MIT