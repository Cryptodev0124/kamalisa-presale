/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef
} from 'react'
import { ethers } from 'ethers'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import '../App.css'
import '../styles/PresaleContainer.css'
import BLAMAnim from '../icons/blam.gif'
import Select from 'react-select'
import styles from '../styles/container/Container.module.scss'
import { useWeb3Modal } from '@web3modal/react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import './i18n'
import MobileWallet from '../icons/mobileWallet.svg'
import AR from '../icons/flags/AR.svg'
import CH from '../icons/flags/CH.svg'
import KO from '../icons/flags/KO.svg'
import EN from '../icons/flags/EN.svg'
import FR from '../icons/flags/FR.svg'
import PT from '../icons/flags/PT.svg'
import SP from '../icons/flags/SP.svg'
import FA from '../icons/flags/FA.svg'
import DE from '../icons/flags/DE.svg'
import LanguageContext from './LanguageContext'
import Countdown from './Countdown'

function Header() {
  const { t, i18n } = useTranslation()

  const [langs] = useState([
    {
      value: 'EN',
      label: (
        <div className="languageContent">
          <img src={EN} />
          &nbsp;English
        </div>
      )
    },
    {
      value: 'CH',
      label: (
        <div className="languageContent">
          <img src={CH} />
          &nbsp;Chinese
        </div>
      )
    },
    {
      value: 'KO',
      label: (
        <div className="languageContent">
          <img src={KO} />
          &nbsp;Korean
        </div>
      )
    },
    {
      value: 'SP',
      label: (
        <div className="languageContent">
          <img src={SP} />
          &nbsp;Spanish
        </div>
      )
    },
    {
      value: 'FR',
      label: (
        <div className="languageContent">
          <img src={FR} />
          &nbsp;French
        </div>
      )
    },
    {
      value: 'AR',
      label: (
        <div className="languageContent">
          <img src={AR} />
          &nbsp;Arabic
        </div>
      )
    },
    {
      value: 'FA',
      label: (
        <div className="languageContent">
          <img src={FA} />
          &nbsp;Persian
        </div>
      )
    },
    {
      value: 'PT',
      label: (
        <div className="languageContent">
          <img src={PT} />
          &nbsp;Portuguese
        </div>
      )
    },
    {
      value: 'DE',
      label: (
        <div className="languageContent">
          <img src={DE} />
          &nbsp;German
        </div>
      )
    }
  ])
  const { open } = useWeb3Modal()
  const {
    selectedLangs,
    setSelectedLangs,
    selectedCountry,
    setSelectedCountry
  } = useContext(LanguageContext)

  useEffect(() => {
    i18n.changeLanguage(selectedLangs)
  }, [selectedLangs, i18n])

  const handleLanguageChange = newLang => {
    switch (newLang) {
      case 'EN':
        setSelectedCountry(EN)
        break
      case 'CH':
        setSelectedCountry(CH)
        break
      case 'KO':
        setSelectedCountry(KO)
        break
      case 'SP':
        setSelectedCountry(SP)
        break
      case 'FR':
        setSelectedCountry(FR)
        break
      case 'AR':
        setSelectedCountry(AR)
        break
      case 'FA':
        setSelectedCountry(FA)
        break
      case 'PT':
        setSelectedCountry(PT)
        break
      case 'DE':
        setSelectedCountry(DE)
        break
      default:
        setSelectedCountry(EN)
    }
    setSelectedLangs(newLang)
  }

  const onConnect = async () => {
    await open()
  }

  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <div className="navBar content-container">
      <div className="navBarSection leftNavBarSection">
        <a href="/">
          <img src={BLAMAnim} alt="logo" className="tokenHeaderAnim" />
        </a>
      </div>
      <div className="navCountdown">
        <Countdown />
      </div>
      <div className="navBarSection rightNavBarSection">
        <a className="navLink" href="/Whitepaper.pdf">
          {t('main.whitepaper')}
        </a>
        <a
          className="navLink"
          href="https://bitcoinlamas-blam.gitbook.io/bitcoinlamas-blam/~/changes/zeZfjvYLs7UC1TSVWEM3?r=Bwv7bIHAsicPXjTBvNJ7"
          target="_blank"
          rel="noreferrer"
        >
          {t('main.GitBook')}
        </a>
        <a className="navLink" href="#roadmap">
          {t('main.Roadmap')}
        </a>
        <a className="navLink" href="#faq">
          {t('main.FAQ')}
        </a>
        <div className="ButtonContainer">
          <Select
            value={
              selectedLangs
                ? {
                    value: selectedLangs,
                    label: (
                      <div className="languageContent">
                        <img src={selectedCountry} />
                        &nbsp; {selectedLangs}
                      </div>
                    )
                  }
                : null
            }
            onChange={option => option && handleLanguageChange(option.value)}
            options={langs}
            isClearable={false}
            isSearchable={false}
            placeholder="Select Languages"
            valueRenderer={({ value }) => value.label}
            styles={{
              control: styles => ({
                ...styles,
                width: '100%',
                backgroundColor: 'transparent',
                color: '#6d7174'
              }),
              option: styles => ({
                ...styles,
                backgroundColor: '#dacfb877',
                color: 'black'
              }),
              singleValue: styles => ({
                ...styles,
                color: '#6d7174'
              }),
              input: styles => ({
                ...styles,
                caretColor: 'transparent'
              }),
              dropdownIndicator: styles => ({
                ...styles,
                color: '#6d7174'
              }),
              placeholder: styles => ({
                gridArea: '1 / 1 / 2 / 3',
                color: '#6d7174',
                marginLeft: '2px',
                marginRight: '2px',
                boxSizing: 'border-box'
              })
            }}
          />
          <div className="navConnectButtonBox">
            {!isConnected ? (
              <>
                <button
                  className="navConnectButton"
                  type="submit"
                  onClick={() => {
                    onConnect()
                  }}
                >
                  <span className="navWallet">{t('main.ConnectWallet')}</span>
                  <div className="navWalletMobile">
                    <img src={MobileWallet} />
                  </div>
                </button>
              </>
            ) : (
              <section className={styles.ConnectWalletSection}>
                <div className="ChainGroupButton">
                  {chain?.id === 56 ? (
                    <button
                      className="navConnectButton"
                      type="submit"
                      onClick={() => onConnect()}
                    >
                      {address.slice(0, 4) + '...' + address.slice(-4)}
                    </button>
                  ) : (
                    <button
                      className="navConnectButton"
                      type="submit"
                      onClick={() => switchNetwork?.(56)}
                    >
                      {'BSC'}
                      {isLoading && pendingChainId === 56 && ''}
                    </button>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
