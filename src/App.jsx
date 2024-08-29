import React from 'react'
import styles from './App.module.scss'
import PresaleContainer from './container/PresaleContainer'
import TermsPage from './pages/Terms'
import PrivacyPage from './pages/Privacy'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { bsc, arbitrum, base } from 'wagmi/chains'
import { LanguageProvider } from './container/LanguageContext'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
// import * as chains from "viem/chains";

const projectId = '29381a4b9e5b754f30d2c4c43e303695'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, arbitrum, base],
  [w3mProvider({ projectId })]
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi'
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '29381a4b9e5b754f30d2c4c43e303695'
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <QueryParamProvider>
          <div className={styles.App}>
            <WagmiConfig config={config}>
              <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{ duration: 5000 }}
              >
                {t => (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <ToastBar onClick={() => alert(1)} toast={t} />
                  </div>
                )}
              </Toaster>
              <Switch>
                <Route exact path="/">
                  <PresaleContainer />
                </Route>
                <Route path="/terms">
                  <TermsPage />
                </Route>
                <Route path="/privacy">
                  <PrivacyPage />
                </Route>
              </Switch>
            </WagmiConfig>
            <Web3Modal
              projectId="29381a4b9e5b754f30d2c4c43e303695"
              ethereumClient={ethereumClient}
            />
          </div>
        </QueryParamProvider>
      </LanguageProvider>
    </Router>
  )
}

export default App
