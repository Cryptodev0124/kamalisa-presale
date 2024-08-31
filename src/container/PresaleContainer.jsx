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
import TokenAbi from '../config/TokenAbi.json'
import PresaleAbi from '../config/PresaleAbi.json'
import '../styles/PresaleContainer.css'
import Input from '../components/Input.tsx'
// import Footer from "../container/Footer.jsx";
import { readContract, writeContract } from '@wagmi/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { waitForTransaction } from '@wagmi/core'
import wallet from '../icons/wallet_full.webp'
import lama from '../icons/lama.png'
import hand from '../icons/hand.png'
import why1 from '../icons/why1.jpg'
import why2 from '../icons/why2.jpg'
import why3 from '../icons/why3.jpg'
import why4 from '../icons/why4.jpg'
import support1 from '../icons/support.webp'
import support2 from '../icons/support(2).webp'
import support3 from '../icons/support(3).webp'
import support4 from '../icons/support(4).webp'
import support5 from '../icons/support(5).webp'
import support6 from '../icons/support(6).webp'
import pieChart from '../icons/piechart.png'
import lamanomics from '../icons/lamanomics.png'
import binance from '../icons/binance.png'
import coingecko from '../icons/coingecko.png'
import coinmarketcap from '../icons/coinmarketcap.png'
import bracketLeft from '../icons/bracket0.svg'
import bracketRight from '../icons/bracket1.svg'
import githubIcon from '../icons/github.svg'
import telegramIcon from '../icons/telegram-fill.svg'
import instagramIcon from '../icons/instagram-fill.svg'
import xIcon from '../icons/x.svg'
import bnb from '../icons/bnb.svg'
import eth from '../icons/eth.png'
import sol from '../icons/sol.png'
import usdc from '../icons/usdc.png'
import usdt from '../icons/USDT.svg'
import success from '../icons/success.jpg'
import MobileWallet from '../icons/mobileWallet.svg'
import BLAM from '../icons/kamalisa-logo.png'
import tokenomicImg from '../icons/kamalisa-tokenomicsimg.png'
import BLAMAnim from '../icons/blam.gif'
import BlamHeader from '../icons/TokenLogo.png'
import Web3 from 'web3'
import { useWeb3Modal } from '@web3modal/react'
import styles from '../styles/container/Container.module.scss'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import './i18n'
import i18n from 'i18next'
import Select from 'react-select'
import LanguageContext from './LanguageContext'
import Header from './Header'
import Footer from './Footer'
import Timer from './Timer'
import Countdown from './Countdown'
// import Pie from './Pie.jsx'
import GradientCircularProgressBar from "./GradientCircularProgressBar";

const BNB_PROVIDER_URL = 'https://mainnet.infura.io/v3/'
let BNBWeb3 = new Web3(new Web3.providers.HttpProvider(BNB_PROVIDER_URL))
const BnbPresaleAddress = '0xfdad9aad93b2dc442930784f17d31a54e87e1b3c'
const EthUsdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const EthUsdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const tokenAddress = '0x930908E0Ad1Ef39B6c74426fC187650946C3028f'

const App = () => {
  const { t, i18n } = useTranslation()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const [tokenAmount, setAmount] = useState(0)
  const [allowanceAmount, setAllowanceAmount] = useState(0)
  const [raisedAmount, setRaisedAmount] = useState(0)
  let [loading, setLoading] = useState(false)
  let [confirming, setConfirming] = useState(false)

  const [PresaleAddress, setPresaleAddress] = useState(BnbPresaleAddress)
  const [usdcAddress, setUsdcAddress] = useState(EthUsdcAddress)
  const [usdtAddress, setUsdtAddress] = useState(EthUsdtAddress)

  const [mainLogo, setMainLogo] = useState(eth)
  const [usdcDecimal, setUsdcDecimal] = useState(6)

  const [mainWeb3, setMainWeb3] = useState(BNBWeb3)
  const [selectedToken, setSelectToken] = useState(0)
  const [selectedTokenName, setSelectedTokenName] = useState()
  const [outTokenAmount, setOutTokenAmount] = useState(0)
  let [accountBalance, setAccountBalance] = useState(0)
  const [firstConnect, setFirstConnect] = useState(false)
  const [progress, setProgress] = useState('0%')
  const { open } = useWeb3Modal()
  const [presaleId, setPresaleId] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [tokenSoldAmount, setTokenSoldAmount] = useState(0)
  const [totalToknesToSell, setTotalTokensToSell] = useState(0)
  const [presaleStatus, setPresaleStatus] = useState('null')
  const [claimable, setClaimable] = useState(false)
  const [claimableAmount, setClaimableAmount] = useState(0)
  const [minTokenToBuyAmount, setMinTokenToBuyAmount] = useState(0)
  const [overallRaised, setOverallRaised] = useState(0)
  const {
    selectedLangs,
    setSelectedLangs,
    selectedCountry,
    setSelectedCountry
  } = useContext(LanguageContext)
  let [code, setCode] = useState()

  const [percent, setPercent] = useState(0)

  const onConnectWallet = async () => {
    await open()
    setFirstConnect(true)
  }

  useEffect(() => {
    const reloadWindow = async () => {
      try {
        window.location.reload()
      } catch(e) {
        console.error(e)
      }
    }
    if(isConnected === true && firstConnect === true) reloadWindow()
  }, [isConnected, firstConnect])

  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  useEffect(() => {
    const switchChain = async () => {
      try {
        switchNetwork?.(1)
      } catch(e) {
        console.error(e)
      }
    }
    if(isConnected === true) {
      if(chain.id !== 1) switchChain()
    }
  }, [isConnected, chain?.id, switchNetwork])

  useEffect(() => {
    const setChainData = async () => {
      try {
        setMainWeb3(BNBWeb3)
        setPresaleAddress(BnbPresaleAddress)
        setUsdcAddress(EthUsdcAddress)
        setUsdtAddress(EthUsdtAddress)
        setMainLogo(eth)
        setUsdcDecimal(6)
      } catch(e) {
        console.error(e)
      }
    }
    if(chain?.id === 1) {
      setChainData()
    }
  }, [chain?.id])

  useEffect(() => {
    if(loading === true) {
      setTimeout(function() {
        setLoading(false)
      }, 3000)
    }
  }, [loading])

  const onTokenAllowance = async () => {
    try {
      setConfirming(true)
      let approve
      if(selectedToken === 1) {
        approve = await writeContract({
          address: usdcAddress,
          abi: TokenAbi,
          functionName: 'approve',
          args: [
            PresaleAddress,
            mainWeb3.utils.toWei(String(tokenAmount), 'ether')
          ]
        })
      } else if(selectedToken === 2) {
        approve = await writeContract({
          address: usdtAddress,
          abi: TokenAbi,
          functionName: 'approve',
          args: [
            PresaleAddress,
            mainWeb3.utils.toWei(String(tokenAmount), 'ether')
          ]
        })
        toast.success('Successfully approved')
      }
      const approveData = await waitForTransaction({
        hash: approve.hash
      })
      console.log('approveData', approveData)
      setConfirming(false)
      let allowance
      if(selectedToken === 1) {
        allowance = await readContract({
          address: usdcAddress,
          abi: TokenAbi,
          functionName: 'allowance',
          args: [address, PresaleAddress]
        })
      } else if(selectedToken === 2) {
        allowance = await readContract({
          address: usdtAddress,
          abi: TokenAbi,
          functionName: 'allowance',
          args: [address, PresaleAddress]
        })
      }
      setAllowanceAmount(Number(allowance) / 10 ** usdcDecimal)
    } catch(err) {
      toast.error(err.details)
      setConfirming(false)
    }
  }

  const onTokenDeposit = async () => {
    try {
      setConfirming(true)
      let deposit
      if(code === undefined || code === '') {
        code = 'default'
      }
      if(selectedToken === 0) {
        deposit = await writeContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'buyWithBNB',
          args: [code],
          value: mainWeb3.utils.toWei(String(tokenAmount), 'ether')
        })
      } else if(selectedToken === 1) {
        deposit = await writeContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'buyWithUSDC',
          args: [mainWeb3.utils.toWei(String(tokenAmount), 'ether'), code]
        })
      } else if(selectedToken === 2) {
        deposit = await writeContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'buyWithUSDT',
          args: [mainWeb3.utils.toWei(String(tokenAmount), 'ether'), code]
        })
      } else {
        deposit = await writeContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'buyWithUSDT',
          args: [mainWeb3.utils.toWei(String(tokenAmount), 'ether'), code]
        })
      }
      const depositData = await waitForTransaction({
        hash: deposit.hash
      })
      console.log('depositData', depositData)
      setTimeout(function() {
        setConfirming(false)
      }, 3000)
      toast.success(
        `Successfully ${tokenAmount} ${selectedTokenName} deposited`
      )
      const presaleData = await readContract({
        address: PresaleAddress,
        abi: PresaleAbi,
        functionName: 'presale',
        args: [presaleId]
      })
      const Amount = Number(presaleData[7])
      setRaisedAmount(Amount)
      const percent = (Number(raisedAmount) * 100) / totalAmount
      setPercent(percent)
      const prog = percent.toFixed(3) + '%'
      setProgress(prog)
    } catch(err) {
      toast.error(
        'There is a problem with your deposit. Please try again later'
      )
      setConfirming(false)
    }
  }

  const onTokenClaim = async () => {
    try {
      setConfirming(true)
      let claim
      claim = await writeContract({
        address: PresaleAddress,
        abi: PresaleAbi,
        functionName: 'claimAmount',
        args: [presaleId]
      })
      const claimData = await waitForTransaction({
        hash: claim.hash
      })
      console.log('claimData', claimData)
      setTimeout(function() {
        setConfirming(false)
      }, 3000)
      toast.success(`Successfully claimed`)
      const claimableData = await readContract({
        address: PresaleAddress,
        abi: PresaleAbi,
        functionName: 'userClaimData',
        args: [address, presaleId]
      })
      let claimableAmounts = ethers.utils.formatEther(
        claimableData[2] - claimableData[3] - claimableData[4]
      )
      setClaimableAmount(claimableAmounts)
    } catch(err) {
      toast.error('There is a problem with your claim. Please try again later')
      setConfirming(false)
    }
  }

  const setMaxAmount = async () => {
    if(selectedToken === 0 && accountBalance > 0)
      accountBalance = accountBalance - 0.001
    setAmount(accountBalance)
  }

  const ETHSelect = async () => {
    try {
      setSelectToken(0)
    } catch(err) {}
  }

  const USDCSelect = async () => {
    try {
      setSelectToken(1)
    } catch(err) {}
  }

  const USDTSelect = async () => {
    try {
      setSelectToken(2)
    } catch(err) {}
  }

  const SOLSelect = async () => {
    try {
      setSelectToken(3)
    } catch(err) {}
  }

  const onConnect = async () => {
    await open()
  }

  useEffect(() => {
    const FetchData = async () => {
      try {
        if(address) {
          if(selectedToken === 0) {
            setSelectedTokenName('ETH')
            // eslint-disable-next-line react-hooks/exhaustive-deps
            accountBalance = await fetchBalance({ address: address })
            setAccountBalance(accountBalance.formatted)
          } else if(selectedToken === 1) {
            setSelectedTokenName('USDC')
            const balance = await readContract({
              address: usdcAddress,
              abi: TokenAbi,
              functionName: 'balanceOf',
              args: [address]
            })
            setAccountBalance(Number(balance) / 10 ** usdcDecimal)
          } else {
            setSelectedTokenName('USDT')
            const balance = await readContract({
              address: usdtAddress,
              abi: TokenAbi,
              functionName: 'balanceOf',
              args: [address]
            })
            setAccountBalance(Number(balance) / 10 ** usdcDecimal)
          }
        }
      } catch(e) {
        console.error(e)
      }
    }

    const FetchGlobalData = async () => {
      try {
        const Id = await readContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'presaleId'
        })
        setPresaleId(Id)
        const presaleData = await readContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'presale',
          args: [Id]
        })
        const overalRaisedAmount = await readContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'overalllRaised'
        })
        setOverallRaised(Number(overalRaisedAmount) / (10 ** 18))
        setRaisedAmount(Number(presaleData[7]))
        setTotalAmount(Number(presaleData[6]))
        setTokenSoldAmount(Number(presaleData[4]))
        setTotalTokensToSell(Number(presaleData[5]))
        setPresaleStatus(presaleData[8])
        setClaimable(presaleData[9])
        const minTokenAmount = await readContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'MinTokenTobuy'
        })
        setMinTokenToBuyAmount(Number(minTokenAmount) / 10 ** 18)
        if(presaleData[9] === true) {
          const claimableData = await readContract({
            address: PresaleAddress,
            abi: PresaleAbi,
            functionName: 'userClaimData',
            args: [address, Id]
          })
          let claimableAmounts = ethers.utils.formatEther(
            claimableData[2] - claimableData[3] - claimableData[4]
          )
          setClaimableAmount(claimableAmounts)
        }
        FetchData()
      } catch(e) {
        console.error(e)
      }
    }
    if(presaleId == null && PresaleAddress !== undefined) {
      FetchGlobalData()
    } else {
      FetchData()
    }
  }, [selectedToken, PresaleAddress])

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const percent = (Number(raisedAmount) * 100) / totalAmount
        setPercent(percent)
        const prog = percent.toFixed(3) + '%'
        setProgress(prog)
      } catch(e) {
        console.error(e)
      }
    }
    if(Number(raisedAmount) > 0) {
      fetchProgress()
    }
  }, [raisedAmount, totalAmount])

  useEffect(() => {
    const FetchData = async () => {
      try {
        let balance
        if(selectedToken === 0) {
          balance = await readContract({
            address: PresaleAddress,
            abi: PresaleAbi,
            functionName: 'bnbToTokens',
            args: [
              presaleId,
              mainWeb3.utils.toWei(String(tokenAmount), 'ether')
            ]
          })
        } else if(selectedToken === 1) {
          balance = await readContract({
            address: PresaleAddress,
            abi: PresaleAbi,
            functionName: 'usdtToTokens',
            args: [
              presaleId,
              mainWeb3.utils.toWei(String(tokenAmount), 'ether')
            ]
          })
        } else {
          balance = await readContract({
            address: PresaleAddress,
            abi: PresaleAbi,
            functionName: 'usdtToTokens',
            args: [
              presaleId,
              mainWeb3.utils.toWei(String(tokenAmount), 'ether')
            ]
          })
        }
        setOutTokenAmount((Number(balance) / 10 ** 18).toFixed(0))
      } catch(e) {
        console.error(e)
      }
    }
    if(tokenAmount > 0) {
      FetchData()
    } else {
      setOutTokenAmount(0)
    }
  }, [
    PresaleAddress,
    mainWeb3.utils,
    presaleId,
    selectedToken,
    tokenAmount,
    usdcDecimal
  ])

  useEffect(() => {
    const useTokenCheck = async () => {
      try {
        let allowance
        if(selectedToken === 1) {
          allowance = await readContract({
            address: usdcAddress,
            abi: TokenAbi,
            functionName: 'allowance',
            args: [address, PresaleAddress]
          })
        } else if(selectedToken === 2) {
          allowance = await readContract({
            address: usdtAddress,
            abi: TokenAbi,
            functionName: 'allowance',
            args: [address, PresaleAddress]
          })
        }
        setAllowanceAmount(mainWeb3.utils.toWei(Number(allowance), 'ether'))
      } catch(e) {
        console.error(e)
      }
    }
    if(tokenAmount > 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTokenCheck()
    }
  }, [
    address,
    selectedToken,
    tokenAmount,
    PresaleAddress,
    usdcAddress,
    usdcDecimal,
    usdtAddress,
    mainWeb3.utils
  ])

  const [faqVisibility, setFaqVisibility] = useState([false, false, false])

  const handleFAQClick = (e, index) => {
    const newVisibility = [...faqVisibility]
    newVisibility[index] = !newVisibility[index]
    newVisibility.forEach((item, i) => {
      if(i !== index) {
        newVisibility[i] = false
      }
    })
    setFaqVisibility(newVisibility)
  }

  const descriptions = useMemo(
    () => ({
      trade: {
        id: 'trade',
        key: 'main.tradeText'
      },
      'liquidity-pools': {
        id: 'liquidity-pools',
        key: 'main.liquidityPoolsText'
      },
      launch: {
        id: 'launch',
        key: 'main.launchText'
      },
      transparency: {
        id: 'transparency',
        key: 'main.transparencyText'
      }
    }),
    []
  )

  const [description, setDescription] =
    useState(t(descriptions.trade.key)) || ''
  const [activeButton, setActiveButton] = useState('trade')

  const handleButtonClick = event => {
    const buttonId = event.target.getAttribute('data-id')
    setActiveButton(buttonId)
    setDescription(t(descriptions[buttonId].key))
  }

  useEffect(() => {
    setDescription(t(descriptions[activeButton].key))
  }, [selectedLangs, i18n, t, setDescription, activeButton, descriptions])

  const TypewriterText = ({ text = '', delay = 300, t }) => {
    const [displayText, setDisplayText] = useState('')

    useEffect(() => {
      if(!text) return

      const timer = setInterval(() => {
        setDisplayText(prevText => {
          if(prevText.length < text.length) {
            return prevText + text[prevText.length]
          } else {
            clearInterval(timer)
            return prevText
          }
        })
      }, delay)

      return () => clearInterval(timer)
    }, [text, delay, t])

    return <p>{displayText}</p>
  }

  const [selectedImageTitle, setSelectedImageTitle] = useState('')
  const [selectedImageLink, setSelectedImageLink] = useState('')
  const [selectedImageIntro, setSelectedImageIntro] = useState('')
  const [
    selectedImageFeaturedInDescription,
    setSelectedImageFeaturedInDescription
  ] = useState('')

  const [highlightedImage, setHighlightedImage] = useState(1)
  const [selectedImage, setSelectedImage] = useState({
    title: '',
    link: '',
    intro: '',
    description: ''
  })

  const handleMouseEnter = useCallback(
    (index, title, link, intro, description) => {
      setSelectedImageTitle(title)
      setSelectedImageLink(link)
      setSelectedImageIntro(intro)
      setSelectedImageFeaturedInDescription(description)

      // Store the information about the last hovered image
      setSelectedImage({
        title,
        link,
        intro,
        description
      })

      // Set the new highlighted image
      setHighlightedImage(index)
      setSelectedImage({
        title,
        link,
        intro,
        description
      })
    },
    []
  )

  const handleInitialMouseEnter = useCallback(() => {
    handleMouseEnter(
      1,
      t('main.coinMarketCap'),
      t('main.coinMarketCapLink'),
      t('main.coinMarketCapDescription')
    )
  }, [t])

  useEffect(() => {
    handleInitialMouseEnter()
  }, [handleInitialMouseEnter])

  return (
    <div>
      <div className="GlobalContainer">
        <Header />
        <div className="pageWrapper">
          <div className="MainDashboard ResponsiveFlexLayout">
            <section className="LeftColumn">
              <section className='ContractContainer'>
                <div className='titleSection'>
                  <img className='tokenomicImg' src={tokenomicImg} alt='' />
                  <p className='claimLive'>CLAIM NOW LIVE</p>
                </div>
                <div>
                  <p>You can now claim your tokenomics.</p>
                  <p>Plus, Stake your tokens to earn rewards!</p>
                  <p>Add</p>
                  <p>{tokenAddress}</p>
                  <p>to your wallet to see your tokenomics.</p>
                </div>
                <div>
                  <p style={{ color: 'black', fontWeight: 700, marginBottom: '5px' }}>YOUR PURCHASED TOKEN = 0</p>
                  <p style={{ color: 'black', fontWeight: 700, marginTop: '5px' }}>YOUR STAKEABLE TOKEN = 0</p>
                </div>
                <div>
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
                        {chain?.id === 1 ? (
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
                            onClick={() => switchNetwork?.(1)}
                          >
                            {'ETHEREUM'}
                            {isLoading && pendingChainId === 1 && ''}
                          </button>
                        )}
                      </section>
                    )}
                  </div>
                </div>
              </section>
            </section>
            <section className="ContactBox RightColumn">
              <section className="ContractContainer">
                <div className='infoSection'>
                  <p style={{ color: '#ffdc11', fontSize: '32px', fontWeight: 700, fontFamily: 'sans-serif', marginBottom: '0px' }}>Buy $KAMALISA</p>
                  {/* <Timer /> */}
                  <Countdown />
                  {/* <Pie percentage={percentage} colour={color} /> */}
                  <GradientCircularProgressBar percentage={45} />
                  <div className='priceInfoSection'>
                    <div className='dividen'></div>
                    <p className='priceInfo'>1 $KAMALISA = $0.000015</p>
                    <div className='dividen'></div>
                  </div>
                </div>
                <div className="PresaleContainer">
                  <section className="tokensButton">
                    {selectedToken === 0 ? (
                      <button
                        className="bnbButton tokenButtons selected"
                        onClick={ETHSelect}
                      >
                        <img className="tokenImage" src={mainLogo} />
                        <span className="tokenButtonText">{'ETH'}</span>
                      </button>
                    ) : (
                      <button
                        className="bnbButton tokenButtons"
                        onClick={ETHSelect}
                      >
                        <img className="tokenImage" src={mainLogo} />
                        <span className="tokenButtonText">{'ETH'}</span>
                      </button>
                    )}
                    {selectedToken === 1 ? (
                      <button
                        className="bnbButton tokenButtons selected"
                        onClick={USDCSelect}
                      >
                        <img className="tokenImage" src={usdc} />
                        <span className="tokenButtonText">
                          &nbsp;USDC
                        </span>
                      </button>
                    ) : (
                      <button
                        className="bnbButton tokenButtons"
                        onClick={USDCSelect}
                      >
                        <img className="tokenImage" src={usdc} />
                        <span className="tokenButtonText">
                          &nbsp;USDC
                        </span>
                      </button>
                    )}
                    {selectedToken === 2 ? (
                      <button
                        className="bnbButton tokenButtons selected"
                        onClick={USDTSelect}
                      >
                        <img className="tokenImage" src={usdt} />
                        <span className="tokenButtonText">
                          &nbsp;USDT
                        </span>
                      </button>
                    ) : (
                      <button
                        className="bnbButton tokenButtons"
                        onClick={USDTSelect}
                      >
                        <img className="tokenImage" src={usdt} />
                        <span className="tokenButtonText">
                          &nbsp;USDT
                        </span>
                      </button>
                    )}
                    {selectedToken === 3 ? (
                      <button
                        className="bnbButton tokenButtons selected"
                        onClick={SOLSelect}
                      >
                        <img className="tokenImage" src={sol} />
                        <span className="tokenButtonText">
                          &nbsp;SOL
                        </span>
                      </button>
                    ) : (
                      <button
                        className="bnbButton tokenButtons"
                        onClick={SOLSelect}
                      >
                        <img className="tokenImage" src={sol} />
                        <span className="tokenButtonText">
                          &nbsp;SOL
                        </span>
                      </button>
                    )}
                  </section>
                  <br />
                  <>
                    {presaleStatus === true ? ( // true
                      <>
                        <section className="InputBox">
                          <section className="InputSection">
                            <div className="LpBalance">
                              <p className="Text1">
                                {t('main.YouPay')} :{' '}
                              </p>
                              <p
                                onClick={setMaxAmount}
                                className="MaxButton"
                              >
                                {t('main.Max')}
                              </p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader">
                                <Input
                                  placeholder="Enter amount"
                                  label=""
                                  type="number"
                                  changeValue={setAmount}
                                  value={tokenAmount}
                                />
                                {selectedToken === 0 ? (
                                  <img
                                    className="tokenImage"
                                    src={mainLogo}
                                  />
                                ) : selectedToken === 1 ? (
                                  <img
                                    className="tokenImage"
                                    src={usdc}
                                  />
                                ) : selectedToken === 2 ? (
                                  <img
                                    className="tokenImage"
                                    src={usdt}
                                  />
                                ) : (
                                  <img
                                    className='tokenImage'
                                    src={sol}
                                  />
                                )}
                              </section>
                            </section>
                          </section>
                          <section className="InputSection">
                            <div className="LpBalance1">
                              <p className="Text1">
                                {t('main.AmountOfTokens')}{' '}
                              </p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader">
                                <input
                                  placeholder="0"
                                  label=""
                                  type="number"
                                  value={outTokenAmount}
                                  style={{ color: '#ead6d6' }}
                                />
                                <img className="tokenImage" src={BLAM} />
                              </section>
                            </section>
                          </section>
                        </section>

                        {/* <section className="InputBox">
                          <section className="InputSectionCode">
                            <div className="LpBalanceCode">
                              <p className="Text1">{t('main.Code')} : </p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader">
                                <Input
                                  placeholder={t('main.EnterCode')}
                                  label=""
                                  type="string"
                                  changeValue={setCode}
                                  value={code}
                                />
                              </section>
                            </section>
                          </section>
                        </section> */}

                        {Number(tokenAmount) > Number(allowanceAmount) &&
                          selectedToken !== 0 ? (
                          <section className="LockBox">
                            {confirming === false ? (
                              <>
                                <button
                                  disabled={false}
                                  onClick={onTokenAllowance}
                                  className="navConnectButton"
                                >
                                  {t('AllowTokensFirst')}
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="Text1">
                                  {t('Approving')}
                                </p>
                                <ClipLoader
                                  color={'#36d7b7'}
                                  loading={confirming}
                                  size={30}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              </>
                            )}
                          </section>
                        ) : (
                          <>
                            {
                              <section className="LockBox">
                                {confirming === false ? (
                                  <>
                                    {isConnected && chain?.id === 1 ? (
                                      <>
                                        <button
                                          disabled={
                                            Number(tokenAmount) <= 0 ||
                                            Number(outTokenAmount) <
                                            minTokenToBuyAmount
                                          }
                                          onClick={onTokenDeposit}
                                          className="navConnectButton"
                                        >
                                          {Number(tokenAmount) <= 0
                                            ? t('Enter Token Amount')
                                            : Number(outTokenAmount) <
                                              minTokenToBuyAmount
                                              ? t(
                                                'MinimumPurchase Is 10!'
                                              )
                                              : t('Deposit Token Now')}
                                          !
                                        </button>
                                        {claimable === true &&
                                          claimableAmount > 0 ? (
                                          <button
                                            disabled={false}
                                            onClick={onTokenClaim}
                                            className="navConnectButton"
                                          >
                                            {t('main.Claim')} (
                                            {Number(
                                              claimableAmount
                                            ).toFixed(3)}{' '}
                                            $BLAM)
                                          </button>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <p className="Text1">
                                      {t('main.Confirming')}...
                                    </p>
                                    <ClipLoader
                                      color={'#36d7b7'}
                                      loading={confirming}
                                      size={30}
                                      aria-label="Loading Spinner"
                                      data-testid="loader"
                                    />
                                  </>
                                )}
                                {!isConnected ? (
                                  <>
                                    <button
                                      className="navConnectButton"
                                      type="submit"
                                      onClick={() => {
                                        onConnectWallet()
                                      }}
                                    >
                                      {t('main.ConnectWallet')}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {chain?.id === 1 ? (
                                      <></>
                                    ) : (
                                      <button
                                        className="navConnectButton"
                                        type="submit"
                                        onClick={() =>
                                          switchNetwork?.(1)
                                        }
                                      >
                                        {t('main.SwitchToETH')}
                                        {isLoading &&
                                          pendingChainId === 1 &&
                                          ' (switching)'}
                                      </button>
                                    )}
                                  </>
                                )}
                              </section>
                            }
                          </>
                        )}
                      </>
                    ) : presaleStatus === false ? (
                      <>
                        <p class="ContractContentTextTitle">
                          {t('main.presaleNotLive')}
                        </p>
                      </>
                    ) : (
                      <>
                        {!isConnected ? (
                          <>
                            <button
                              className="navConnectButton"
                              type="submit"
                              onClick={() => {
                                onConnectWallet()
                              }}
                            >
                              [
                              <img
                                src={MobileWallet}
                                style={{ marginBottom: '-6px' }}
                              />
                              &nbsp;{t('main.connectWalletButton')}&nbsp;]
                            </button>
                            <p className="hcenter warning-text">
                              {t('main.iAgree')}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="Text1">
                              {t('main.dataLoading')}
                            </p>
                            <ClipLoader
                              color={'#36d7b7'}
                              loading={confirming}
                              size={30}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
