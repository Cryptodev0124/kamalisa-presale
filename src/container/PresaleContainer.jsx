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
import usdc from '../icons/usdc.png'
import usdt from '../icons/USDT.svg'
import success from '../icons/success.jpg'
import MobileWallet from '../icons/mobileWallet.svg'
import BLAM from '../icons/TokenLogo.png'
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
// import Countdown from './Countdown.jsx'

const BNB_PROVIDER_URL = 'https://bsc-rpc.publicnode.com'
let BNBWeb3 = new Web3(new Web3.providers.HttpProvider(BNB_PROVIDER_URL))
const BnbPresaleAddress = '0xfdad9aad93b2dc442930784f17d31a54e87e1b3c'
const BnbUsdcAddress = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
const BnbUsdtAddress = '0x55d398326f99059fF775485246999027B3197955'

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
  const [usdcAddress, setUsdcAddress] = useState(BnbUsdcAddress)
  const [usdtAddress, setUsdtAddress] = useState(BnbUsdtAddress)

  const [mainLogo, setMainLogo] = useState(bnb)
  const [usdcDecimal, setUsdcDecimal] = useState(18)

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

  const onConnectWallet = async () => {
    await open()
    setFirstConnect(true)
  }

  useEffect(() => {
    const reloadWindow = async () => {
      try {
        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    }
    if (isConnected === true && firstConnect === true) reloadWindow()
  }, [isConnected, firstConnect])

  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  useEffect(() => {
    const switchChain = async () => {
      try {
        switchNetwork?.(56)
      } catch (e) {
        console.error(e)
      }
    }
    if (isConnected === true) {
      if (chain.id !== 56) switchChain()
    }
  }, [isConnected, chain?.id, switchNetwork])

  useEffect(() => {
    const setChainData = async () => {
      try {
        setMainWeb3(BNBWeb3)
        setPresaleAddress(BnbPresaleAddress)
        setUsdcAddress(BnbUsdcAddress)
        setUsdtAddress(BnbUsdtAddress)
        setMainLogo(bnb)
        setUsdcDecimal(18)
      } catch (e) {
        console.error(e)
      }
    }
    if (chain?.id === 56) {
      setChainData()
    }
  }, [chain?.id])

  useEffect(() => {
    if (loading === true) {
      setTimeout(function () {
        setLoading(false)
      }, 3000)
    }
  }, [loading])

  const onTokenAllowance = async () => {
    try {
      setConfirming(true)
      let approve
      if (selectedToken === 1) {
        approve = await writeContract({
          address: usdcAddress,
          abi: TokenAbi,
          functionName: 'approve',
          args: [
            PresaleAddress,
            mainWeb3.utils.toWei(String(tokenAmount), 'ether')
          ]
        })
      } else if (selectedToken === 2) {
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
      if (selectedToken === 1) {
        allowance = await readContract({
          address: usdcAddress,
          abi: TokenAbi,
          functionName: 'allowance',
          args: [address, PresaleAddress]
        })
      } else if (selectedToken === 2) {
        allowance = await readContract({
          address: usdtAddress,
          abi: TokenAbi,
          functionName: 'allowance',
          args: [address, PresaleAddress]
        })
      }
      setAllowanceAmount(Number(allowance) / 10 ** usdcDecimal)
    } catch (err) {
      toast.error(err.details)
      setConfirming(false)
    }
  }

  const onTokenDeposit = async () => {
    try {
      setConfirming(true)
      let deposit
      if (code === undefined || code === '') {
        code = 'default'
      }
      if (selectedToken === 0) {
        deposit = await writeContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'buyWithBNB',
          args: [code],
          value: mainWeb3.utils.toWei(String(tokenAmount), 'ether')
        })
      } else if (selectedToken === 1) {
        deposit = await writeContract({
          address: PresaleAddress,
          abi: PresaleAbi,
          functionName: 'buyWithUSDC',
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
      setTimeout(function () {
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
      const prog = percent.toFixed(3) + '%'
      setProgress(prog)
    } catch (err) {
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
      setTimeout(function () {
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
    } catch (err) {
      toast.error('There is a problem with your claim. Please try again later')
      setConfirming(false)
    }
  }

  const setMaxAmount = async () => {
    if (selectedToken === 0 && accountBalance > 0)
      accountBalance = accountBalance - 0.001
    setAmount(accountBalance)
  }

  const ETHSelect = async () => {
    try {
      setSelectToken(0)
    } catch (err) {}
  }

  const USDCSelect = async () => {
    try {
      setSelectToken(1)
    } catch (err) {}
  }

  const USDTSelect = async () => {
    try {
      setSelectToken(2)
    } catch (err) {}
  }

  useEffect(() => {
    const FetchData = async () => {
      try {
        if (address) {
          if (selectedToken === 0) {
            setSelectedTokenName('BNB')
            // eslint-disable-next-line react-hooks/exhaustive-deps
            accountBalance = await fetchBalance({ address: address })
            setAccountBalance(accountBalance.formatted)
          } else if (selectedToken === 1) {
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
      } catch (e) {
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
        if (presaleData[9] === true) {
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
      } catch (e) {
        console.error(e)
      }
    }
    if (presaleId == null && PresaleAddress !== undefined) {
      FetchGlobalData()
    } else {
      FetchData()
    }
  }, [selectedToken, PresaleAddress])

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const percent = (Number(raisedAmount) * 100) / totalAmount
        const prog = percent.toFixed(3) + '%'
        setProgress(prog)
      } catch (e) {
        console.error(e)
      }
    }
    if (Number(raisedAmount) > 0) {
      fetchProgress()
    }
  }, [raisedAmount, totalAmount])

  useEffect(() => {
    const FetchData = async () => {
      try {
        let balance
        if (selectedToken === 0) {
          balance = await readContract({
            address: PresaleAddress,
            abi: PresaleAbi,
            functionName: 'bnbToTokens',
            args: [
              presaleId,
              mainWeb3.utils.toWei(String(tokenAmount), 'ether')
            ]
          })
        } else if (selectedToken === 1) {
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
      } catch (e) {
        console.error(e)
      }
    }
    if (tokenAmount > 0) {
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
        if (selectedToken === 1) {
          allowance = await readContract({
            address: usdcAddress,
            abi: TokenAbi,
            functionName: 'allowance',
            args: [address, PresaleAddress]
          })
        } else if (selectedToken === 2) {
          allowance = await readContract({
            address: usdtAddress,
            abi: TokenAbi,
            functionName: 'allowance',
            args: [address, PresaleAddress]
          })
        }
        setAllowanceAmount(mainWeb3.utils.toWei(Number(allowance), 'ether'))
      } catch (e) {
        console.error(e)
      }
    }
    if (tokenAmount > 0) {
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
      if (i !== index) {
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
      if (!text) return

      const timer = setInterval(() => {
        setDisplayText(prevText => {
          if (prevText.length < text.length) {
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
        <div class="background-container" />
        <Header />
        {
          <div className="pageWrapper">
            <div className="MainDashboard ResponsiveFlexLayout">
              <section className="LeftColumn">
                <h1 className="h1 orange">Bitcoinlamas :</h1>
                <p className="headerText1">{t('main.Header1')}</p>
                <p className="text">{t('main.Header2')}</p>
                <br />
                <div>
                  <div className="whitelist-row">
                    <div
                      className="socials-row"
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <a
                        href="https://t.me/bitcoinlamas"
                        className="socialIcon"
                      >
                        <img src={telegramIcon} />
                      </a>
                      <a
                        href="https://twitter.com/bitcoinlamas"
                        className="socialIcon"
                      >
                        <img src={xIcon} />
                      </a>
                      <a
                        href="https://www.instagram.com/bitcoinlamas"
                        className="socialIcon"
                      >
                        <div style={{ marginTop: '-3px' }}>
                          <img src={instagramIcon} width="42px" />
                        </div>
                      </a>
                    </div>
                  </div>
                  {/* <div className="hcenter pageCountdown">
                    <Countdown />
                  </div> */}
                </div>
                <img src={success} className="HeroImage" />
              </section>
              <section className="ContactBox RightColumn">
                <>
                  <div className="StyledContainer">
                    <section className="ContractContainer">
                      <section className="DepositBoxHeader"></section>

                      <div className="PresaleContainer">
                        <div className="">
                          {/* <p class="one_how">
                            <span className="presale-text-small">
                              {t('main.RoundPrice')}
                            </span>
                            <br />
                            <span className="this-round-price">$0.30</span>
                          </p> */}
                          <p>Raised more than </p>
                          <p className="presale-text white">
                              $ 500,000
                              </p>
                          <div className="">
                            {!isConnected ? (
                              <>
                                <div className="ChainGroupButton">
                                  <button
                                    className="presale-button"
                                    type="submit"
                                    onClick={() => onConnectWallet()}
                                  >
                                    <img
                                      className="tokenImage"
                                      src={mainLogo}
                                      style={{ height: '67%' }}
                                    />
                                    {'BSC'}
                                    {isLoading && pendingChainId === 56 && ''}
                                  </button>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <br />
                          <section className="HeaderContent">
                            {/* <p className="presale-text-small">
                              {(tokenSoldAmount / 10 ** 18).toLocaleString()}{' '}
                              $BLAM
                            </p>
                            <p className="presale-text-small">
                              {(totalToknesToSell / 10 ** 18).toLocaleString()}{' '}
                              $BLAM
                            </p> */}
                          </section>
                          <section className="HeaderContent3">
                            <section
                              className="HeaderContent4"
                              // style={{ width: progress }}
                              style={{ width: '52%' }}
                            >
                              <img
                                src={BLAM}
                                alt="BLAM"
                                className="HeaderContent-Image-Img"
                              />
                            </section>
                          </section>
                          <br />
                          <section className="HeaderContent2">
                            {/* <p className="presale-text orange">
                              {raisedAmount > 0
                                ? Number(
                                    (
                                      Number(raisedAmount) /
                                      10 ** usdcDecimal
                                    ).toFixed(0)
                                  ).toLocaleString()
                                : 0}{' '}
                              USD
                            </p>
                            <p className="presale-text white">
                              {totalAmount > 0
                                ? Number(
                                    (
                                      Number(totalAmount) /
                                      10 ** usdcDecimal
                                    ).toFixed(0)
                                  ).toLocaleString()
                                : 0}{' '}
                              USD
                            </p> */}
                          </section>
                        </div>
                        {/* <section
                          className="presale-text"
                          style={{ textAlign: 'left' }}
                        >
                          {selectedTokenName} {t('main.Balance')} :{' '}
                          {Number(accountBalance) > 0.00001
                            ? Number(accountBalance).toFixed(3)
                            : '0'}
                        </section> */}
                        <br />
                        <section className="tokensButton">
                          {selectedToken === 0 ? (
                            <button
                              className="bnbButton tokenButtons selected"
                              onClick={ETHSelect}
                            >
                              <img className="tokenImage" src={mainLogo} />
                              <span className="tokenButtonText">{'BNB'}</span>
                            </button>
                          ) : (
                            <button
                              className="bnbButton tokenButtons"
                              onClick={ETHSelect}
                            >
                              <img className="tokenImage" src={mainLogo} />
                              <span className="tokenButtonText">{'BNB'}</span>
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
                                      ) : (
                                        <img
                                          className="tokenImage"
                                          src={usdt}
                                        />
                                      )}
                                    </section>
                                  </section>
                                </section>
                                <section className="InputSection">
                                  <div className="LpBalance">
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

                              <section className="InputBox">
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
                              </section>

                              {Number(tokenAmount) > Number(allowanceAmount) &&
                              selectedToken !== 0 ? (
                                <section className="LockBox">
                                  {confirming === false ? (
                                    <>
                                      <button
                                        disabled={false}
                                        onClick={onTokenAllowance}
                                        className="PresaleButton"
                                      >
                                        {t('main.AllowTokensFirst')}
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <p className="Text1">
                                        {t('main.Approving')}
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
                                          {isConnected && chain?.id === 56 ? (
                                            <>
                                              <button
                                                disabled={
                                                  Number(tokenAmount) <= 0 ||
                                                  Number(outTokenAmount) <
                                                    minTokenToBuyAmount
                                                }
                                                onClick={onTokenDeposit}
                                                className="PresaleButton"
                                              >
                                                {Number(tokenAmount) <= 0
                                                  ? t('main.EnterTokenAmount')
                                                  : Number(outTokenAmount) <
                                                    minTokenToBuyAmount
                                                  ? t(
                                                      'main.MinimumPurchaseIs10'
                                                    )
                                                  : t('main.DepositTokenNow')}
                                                !
                                              </button>
                                              {claimable === true &&
                                              claimableAmount > 0 ? (
                                                <button
                                                  disabled={false}
                                                  onClick={onTokenClaim}
                                                  className="PresaleButton"
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
                                            className="PresaleButton"
                                            type="submit"
                                            onClick={() => {
                                              onConnectWallet()
                                            }}
                                          >
                                            [{t('main.ConnectWallet')}]
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          {chain?.id === 56 ? (
                                            <></>
                                          ) : (
                                            <button
                                              className="PresaleButton"
                                              type="submit"
                                              onClick={() =>
                                                switchNetwork?.(56)
                                              }
                                            >
                                              {t('main.SwitchToBNB')}
                                              {isLoading &&
                                                pendingChainId === 56 &&
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
                                    className="PresaleButton"
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
                    {/* <section
                      className="ContractContainer"
                      style={{
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        marginTop: '12px'
                      }}
                    >
                      <div className="next-round-price-row">
                        <span className="next-round">
                          {t('main.nextRoundPrice')}
                        </span>
                        <span className="next-round-price">$0.45</span>
                      </div>
                    </section>{' '} */}
                  </div>
                </>
              </section>
            </div>
          </div>
        }
      </div>

      <section className="what hcenter">
        <div className="what-background-container2" />
        <div className="mainWrapper">
          <h1 className="h1 orange whatHeader">
            {t('main.whatIsBitcoinlamasHeader')}
          </h1>
          <div className="whatText">
            <p className="text">{t('main.whatIsBitcoinlamasDescription')}</p>
            <br />
          </div>{' '}
          <div className="whatButtons">
            <button
              className={`whatButton ${
                activeButton === 'trade' ? 'activeButton' : ''
              }`}
              data-id="trade"
              onClick={handleButtonClick}
            >
              [ {t('main.tradeButtonText')} ]
            </button>
            <button
              className={`whatButton ${
                activeButton === 'liquidity-pools' ? 'activeButton' : ''
              }`}
              data-id="liquidity-pools"
              onClick={handleButtonClick}
            >
              [ {t('main.liquidityPoolsButtonText')} ]
            </button>
            <button
              className={`whatButton ${
                activeButton === 'launch' ? 'activeButton' : ''
              }`}
              data-id="launch"
              onClick={handleButtonClick}
            >
              [ {t('main.launchButtonText')} ]
            </button>
            <button
              className={`whatButton ${
                activeButton === 'transparency' ? 'activeButton' : ''
              }`}
              data-id="transparency"
              onClick={handleButtonClick}
            >
              [ {t('main.transparencyButtonText')} ]
            </button>
          </div>
          <br />
          <br />
          <div className="descriptionBox">
            <TypewriterText text={description} delay={40} />
          </div>
        </div>
      </section>

      <div className="mainWrapper" style={{ marginTop: '128px' }}>
        <section className="stake hcenter">
          <div className="stake-background-container" />
          <h1 className="h1 orange stakeHeader">
            {t('main.stakingComingSoon')}
          </h1>
          <div className="stakeText">
            <p className="text">{t('main.allHoldersEnjoy')}</p>
            <br />
            <br />
          </div>
        </section>
      </div>

      <div className="mainWrapper ResponsiveFlexLayout">
        <section className="LeftColumn">
          <h1 className="h1 orange" style={{ fontSize: '3rem' }}>
            {t('main.whyChooseBinanceNetwork')}
          </h1>
          <div className="whyImages">
            <img src={why1} className="whyImage1" />
            <img src={why2} className="whyImage2" />
            <img src={why4} className="whyImage3" />
            <img src={why3} className="whyImage4" />
          </div>
        </section>
        <section className="ContactBox RightColumn">
          <br />
          <p className="text">{t('main.bitcoinlamasLeverages')}</p>
          <br />
          <p className="whyBox">
            <img src={BLAM} alt="" className="why-hover-image" />
            <span className="orange">
              {t('main.binanceFaultTolerance')}:
            </span>{' '}
            {t('main.binanceFaultToleranceDescription')}
          </p>
          <p className="whyBox">
            <img src={BLAM} alt="" className="why-hover-image" />
            <span className="orange">{t('main.consensusMechanismsFast')}</span>
            {t('main.consensusMechanismsFastDescription')}
          </p>
          <p className="whyBox">
            <img src={BLAM} alt="" className="why-hover-image" />
            <span className="orange">{t('main.globalNetworkEffect')}</span>
            {t('main.globalNetworkEffectDescription')}
          </p>
          <p className="whyBox">
            <img src={BLAM} alt="" className="why-hover-image" />
            <span className="orange">{t('main.provenSecurityModel')}</span>
            {t('main.provenSecurityModelDescription')}
          </p>
        </section>
      </div>

      <section className="hcenter">
        <h1 className="h1 orange whatHeader">{t('main.featuredInHeader')}</h1>
        <div className="mainWrapper ResponsiveFlexLayout">
          <section className="LeftColumn">
            <div className="featuredInLogo-grid">
              <div className="grid-item">
                <a
                  href={t('main.coinMarketCapLink')}
                  className={`img-container${
                    highlightedImage === 1 ? ' img-container-highlight' : ''
                  }`}
                  onMouseEnter={() =>
                    handleMouseEnter(
                      1, // Set the index for this image
                      t('main.coinMarketCap'),
                      t('main.coinMarketCapLink'),
                      t('main.coinMarketCapDescription')
                    )
                  }
                >
                  <img
                    src={coinmarketcap}
                    alt="CoinMarketCap"
                    style={{ maxWidth: '256px', maxHeight: '64px' }}
                  />
                </a>
              </div>
              <div className="grid-item">
                <a
                  href={t('main.binanceLink')}
                  className={`img-container${
                    highlightedImage === 2 ? ' img-container-highlight' : ''
                  }`}
                  onMouseEnter={() =>
                    handleMouseEnter(
                      2, // Set the index for this image
                      t('main.binance'),
                      t('main.binanceLink'),
                      t('main.binanceDescription')
                    )
                  }
                >
                  <img
                    src={binance}
                    alt="Binance"
                    style={{ maxWidth: '256px', maxHeight: '64px' }}
                  />
                </a>
              </div>
              <div className="grid-item">
                <a
                  href={t('main.coinGeckoLink')}
                  className={`img-container${
                    highlightedImage === 3 ? ' img-container-highlight' : ''
                  }`}
                  onMouseEnter={() =>
                    handleMouseEnter(
                      3, // Set the index for this image
                      t('main.coinGecko'),
                      t('main.coinGeckoLink'),
                      t('main.coinGeckoDescription')
                    )
                  }
                >
                  <img
                    src={coingecko}
                    alt="CoinGecko"
                    style={{ maxWidth: '256px', maxHeight: '64px' }}
                  />
                </a>
              </div>
            </div>
            <br />
          </section>
          <section className="RightColumn">
            <div className="featuredInDetails text-box">
              <div className="title-and-link">
                <div className="title">{selectedImageTitle}</div>
                <a href={t(selectedImageLink)} className="readMore">
                  {t('main.readMore')}
                </a>
              </div>
              <p className="orange text FeaturedInIntro">
                {t(selectedImageIntro)}
              </p>
              <p className="text FeaturedInDescription">
                {t(selectedImageFeaturedInDescription)}
              </p>
            </div>
          </section>
        </div>
        <br />
      </section>

      <section className="year">
        <div className="year-background-container" />
        <br />
        <br />
        <div>
          <div className="whitelist-row">
            <div className="year-buttons hcenter">
              <h1 className="h1 orange hcenter" style={{ fontSize: '3rem' }}>
                {t('main.yearHeader')}
                <img src={hand} width="32px" height="32px" alt="" />
              </h1>
              <p></p>
              <table className="year-table">
                <tr>
                  <td></td>
                  <td style={{ display: 'table-cell' }}></td>
                  <td></td>
                  <td style={{ display: 'table-cell' }}></td>
                  <td></td>
                </tr>
              </table>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>

      <div className="mainWrapper">
        <section className="Support" id="we-support">
          <br />
          <h1 className="h1 orange hcenter" style={{ marginTop: '-8px' }}>
            {t('main.supportHeader')}
          </h1>
          <div className="SupportLayout">
            <div className="SupportItem">
              <img src={wallet} />
              <img className="supportedWalletIcon" src={support1} />
              <span className="supportedWalletTitle">
                {t('main.leatherWallet')}
              </span>
            </div>
            <div className="SupportItem">
              <img src={wallet} />
              <img className="supportedWalletIcon" src={support2} />
              <span className="supportedWalletTitle">{t('main.xverse')}</span>
            </div>
            <div className="SupportItem">
              <img src={wallet} />
              <img className="supportedWalletIcon" src={support3} />
              <span className="supportedWalletTitle">{t('main.ryder')}</span>
            </div>
            <div className="SupportItem">
              <img src={wallet} />
              <img className="supportedWalletIcon" src={support4} />
              <span className="supportedWalletTitle">
                {t('main.boomWallet')}
              </span>
            </div>
            <div className="SupportItem">
              <img src={wallet} />
              <img className="supportedWalletIcon" src={support5} />
              <span className="supportedWalletTitle">{t('main.dCent')}</span>
            </div>
            <div className="SupportItem">
              <img src={wallet} />
              <img className="supportedWalletIcon" src={support6} />
              <span className="supportedWalletTitle">
                {t('main.okxWallet')}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="mainWrapper2">
        <section className="inspiredBy hcenter">
          <div className="inspiredby-background-container" />
          <h1 className="h1 orange inspiredByHeader">{t('main.inspiredBy')}</h1>
          <div className="inspiredByText">
            <p className="text">{t('main.inspiredByDescription')}</p>
            <br />
          </div>
        </section>
      </div>

      <section className="Lamanomics hcenter" id="lamanomics">
        <div className="lamanomicsTable">
          <h1 className="h1 orange" style={{ marginTop: '-8px' }}>
            {t('main.lamanomics')}
          </h1>
          <table
            className="tokenomics-table responsive-table"
            style={{ borderCollapse: 'collapse', border: '1px solid gray' }}
          >
            <tr>
              <td rowSpan={3} className="hidden-on-mobile">
                <img
                  src={lamanomics}
                  alt="Pie Chart"
                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                />
              </td>
              <td style={{ borderColor: 'gray', borderBottomWidth: '1px' }}>
                {t('main.totalTokenSupply')} <br />
                21.000.000 BLAM
              </td>
            </tr>
            <tr>
              <td
                className="hidden-on-desktop"
                style={{
                  textAlign: 'center',
                  borderColor: 'gray',
                  borderBottomWidth: '1px'
                }}
              >
                <img
                  src={lamanomics}
                  alt="Pie Chart"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ borderColor: 'gray' }}>
                <div style={{ display: 'flex' }}>
                  <div
                    className="color-square"
                    style={{ backgroundColor: '#f4f4f4' }}
                  ></div>
                  <span className="pieDescription">{t('main.presale')}</span>
                  <span
                    className="pieDescription"
                    style={{ marginLeft: 'auto' }}
                  >
                    40%
                  </span>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    className="color-square"
                    style={{ backgroundColor: '#cfc49b' }}
                  ></div>
                  <span className="pieDescription">{t('main.liquidity')}</span>
                  <span
                    className="pieDescription"
                    style={{ marginLeft: 'auto' }}
                  >
                    30%
                  </span>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    className="color-square"
                    style={{ backgroundColor: '#8f7e71' }}
                  ></div>
                  <span className="pieDescription">{t('main.staking')}</span>
                  <span
                    className="pieDescription"
                    style={{ marginLeft: 'auto' }}
                  >
                    15%
                  </span>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    className="color-square"
                    style={{ backgroundColor: '#453c3b' }}
                  ></div>
                  <span className="pieDescription">{t('main.marketing')}</span>
                  <span
                    className="pieDescription"
                    style={{ marginLeft: 'auto' }}
                  >
                    8%
                  </span>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    className="color-square"
                    style={{ backgroundColor: '#d8cdb6' }}
                  ></div>
                  <span className="pieDescription">{t('main.charity')}</span>

                  <span
                    className="pieDescription"
                    style={{ marginLeft: 'auto' }}
                  >
                    5%
                  </span>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    className="color-square"
                    style={{ backgroundColor: '#727272' }}
                  ></div>
                  <span className="pieDescription">{t('main.team')}</span>
                  <span
                    className="pieDescription"
                    style={{ marginLeft: 'auto' }}
                  >
                    2%
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </section>
      <div className="mainWrapper">
        <section className="Roadmap" id="roadmap">
          <br />
          <h1 className="h1 orange" style={{ marginTop: '-8px' }}>
            {t('main.roadmapHeader')}
          </h1>
          <div className="RoadmapLayout">
            {/* Q2 2024 */}
            <div className="RoadmapItem">
              <div className="RoadmapItemTitle orange h1">
                [&nbsp;{t('main.q2')}&nbsp;]&nbsp;{t('main.year2024')}
              </div>
              <div className="RoadmapItemDescription text">
                <p>{t('main.presalePreparation')}</p>
                <p>{t('main.communityBuilding')}</p>
                <p>{t('main.officialPresaleLaunch')}</p>
              </div>
            </div>
            {/* Q3 2024 */}
            <div className="RoadmapItem">
              <div className="RoadmapItemTitle orange h1">
                [&nbsp;{t('main.q3')}&nbsp;]&nbsp;{t('main.year2024')}
              </div>
              <div className="RoadmapItemDescription text">
                <p>{t('main.nftMarketplace')}</p>
                <p>{t('main.marketingCampaignInitiation')}</p>
                <p>{t('main.binanceListing')}</p>
                <p>{t('main.cmcListingApplication')}</p>
                <p>{t('main.coingekoListingApplication')}</p>
                <p>{t('main.lamaLeagueMinigame')}</p>
              </div>
            </div>
            {/* Q4 2024 */}
            <div className="RoadmapItem">
              <div className="RoadmapItemTitle orange h1">
                [&nbsp;{t('main.q4')}&nbsp;]&nbsp;{t('main.year2024')}
              </div>
              <div className="RoadmapItemDescription text">
                <p>{t('main.firstDexListing')}</p>
                <p>{t('main.dexToolsEnhancement')}</p>
                <p>{t('main.continuedMarketingEfforts')}</p>
                <p>{t('main.reduceToTheMax')}</p>
                <p>{t('main.openingLamaland')}</p>
              </div>
            </div>
            {/* Q1 2025 */}
            <div className="RoadmapItem">
              <div className="RoadmapItemTitle orange h1">
                [&nbsp;{t('main.q1')}&nbsp;]&nbsp;{t('main.year2025')}
              </div>
              <div className="RoadmapItemDescription text">
                <p>{t('main.firstCexListing')}</p>
                <p>{t('main.launchOfBlamfi')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="FAQ" id="faq">
          <div className="ResponsiveFlexLayout">
            <section className="FaqLeftColumn">
              <h1 className="h1 orange" style={{ marginTop: '-8px' }}>
                {t('main.faqHeader')}
              </h1>
              <p className="text">{t('main.faqIntro')}</p>
            </section>
            <section className="FaqRightColumn">
              <div className={`faqItem ${faqVisibility[0] ? 'active' : ''}`}>
                <div className="faqTitle" onClick={e => handleFAQClick(e, 0)}>
                  <p className="orange">{t('main.restrictedCountriesTitle')}</p>
                  <span
                    className={`faqToggleIcon ${
                      faqVisibility[0] ? 'active' : ''
                    }`}
                  >
                    {faqVisibility[0] ? '-' : '+'}
                  </span>
                </div>
                <div
                  className={`faqAnswer ${faqVisibility[0] ? 'active' : ''}`}
                  style={{
                    display: faqVisibility[0] ? 'block' : 'none'
                  }}
                >
                  <p>{t('main.restrictedCountriesAnswer')}</p>
                </div>
              </div>
              <div className={`faqItem ${faqVisibility[1] ? 'active' : ''}`}>
                <div className="faqTitle" onClick={e => handleFAQClick(e, 1)}>
                  <p className="orange">{t('main.claimingBlamTitle')}</p>
                  <span
                    className={`faqToggleIcon ${
                      faqVisibility[1] ? 'active' : ''
                    }`}
                  >
                    {faqVisibility[1] ? '-' : '+'}
                  </span>
                </div>
                <div
                  className={`faqAnswer ${faqVisibility[1] ? 'active' : ''}`}
                  style={{
                    display: faqVisibility[1] ? 'block' : 'none'
                  }}
                >
                  <p>{t('main.claimingBlamAnswer')}</p>
                </div>
              </div>
              <div className={`faqItem ${faqVisibility[2] ? 'active' : ''}`}>
                <div className="faqTitle" onClick={e => handleFAQClick(e, 2)}>
                  <p className="orange">{t('main.numberOfRoundsTitle')}</p>
                  <span
                    className={`faqToggleIcon ${
                      faqVisibility[2] ? 'active' : ''
                    }`}
                  >
                    {faqVisibility[2] ? '-' : '+'}
                  </span>
                </div>
                <div
                  className={`faqAnswer ${faqVisibility[2] ? 'active' : ''}`}
                  style={{
                    display: faqVisibility[2] ? 'block' : 'none'
                  }}
                >
                  <p>{t('main.numberOfRoundsAnswer')}</p>
                </div>
              </div>
              <div className={`faqItem ${faqVisibility[3] ? 'active' : ''}`}>
                <div className="faqTitle" onClick={e => handleFAQClick(e, 3)}>
                  <p className="orange">{t('main.priceTableHeader')}</p>
                  <span
                    className={`faqToggleIcon ${
                      faqVisibility[3] ? 'active' : ''
                    }`}
                  >
                    {faqVisibility[3] ? '-' : '+'}
                  </span>
                </div>
                <div
                  className={`faqAnswer ${faqVisibility[3] ? 'active' : ''}`}
                  style={{
                    display: faqVisibility[3] ? 'block' : 'none'
                  }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>{t('main.number')}</th>
                        <th className="token-supply">
                          {t('main.tokenSupply')}
                        </th>
                        <th>{t('main.price')}</th>
                        <th className="total">{t('main.total')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('main.number1')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue')}
                        </td>
                        <td>{t('main.priceValue')}</td>
                        <td className="total">{t('main.totalValue')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number2')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue2')}
                        </td>
                        <td>{t('main.priceValue2')}</td>
                        <td className="total">{t('main.totalValue2')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number3')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue3')}
                        </td>
                        <td>{t('main.priceValue3')}</td>
                        <td className="total">{t('main.totalValue3')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number4')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue4')}
                        </td>
                        <td>{t('main.priceValue4')}</td>
                        <td className="total">{t('main.totalValue4')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number5')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue5')}
                        </td>
                        <td>{t('main.priceValue5')}</td>
                        <td className="total">{t('main.totalValue5')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number6')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue6')}
                        </td>
                        <td>{t('main.priceValue6')}</td>
                        <td className="total">{t('main.totalValue6')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number7')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue7')}
                        </td>
                        <td>{t('main.priceValue7')}</td>
                        <td className="total">{t('main.totalValue7')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number8')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue8')}
                        </td>
                        <td>{t('main.priceValue8')}</td>
                        <td className="total">{t('main.totalValue8')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number9')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue9')}
                        </td>
                        <td>{t('main.priceValue9')}</td>
                        <td className="total">{t('main.totalValue9')}</td>
                      </tr>
                      <tr>
                        <td>{t('main.number10')}</td>
                        <td className="token-supply">
                          {t('main.tokenSupplyValue10')}
                        </td>
                        <td>{t('main.priceValue10')}</td>
                        <td className="total">{t('main.totalValue10')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="disclaimer hcenter">
          <div className="scrolling-disclaimer-container">
            <div className="scrolling-disclaimer-text">
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
            </div>
          </div>
          <h1 className="h1 orange">{t('main.disclaimerHeader')}</h1>
          <div className="disclaimerText">
            <p className="text">{t('main.disclaimerText')}</p>
            <br />
          </div>
          <div className="scrolling-disclaimer-container2">
            <div className="scrolling-disclaimer-text2">
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
              <img src={lama} width="24px" height="24px" alt="" />
              <img src={hand} width="24px" height="24px" alt="" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default App
