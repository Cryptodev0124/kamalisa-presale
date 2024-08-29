import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount, useNetwork } from "wagmi";
import '../App.css'
import LPLockerAbi from '../config/LPLockerAbi.json'
import LPTokenAbi from '../config/LPTokenAbi.json'
import TokenAbi from '../config/TokenAbi.json'
import "../styles/LockContainer.css";
// import Header from "../container/Header.jsx";
import Footer from "../container/Footer.jsx";
import { readContract, writeContract } from '@wagmi/core'
import BounceLoader from "react-spinners/BounceLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { waitForTransaction } from '@wagmi/core'

const App = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  let [loading, setLoading] = useState(true);
  let [confirming, setConfirming] = useState(false);
  let [accountDatas, setAccountDatas] = useState();
  const LPLockerAddress = "0x4477f9fd9c65b69b52a59b4fca772179be3c67b3";

  useEffect(() => {
    const FetchLockerData = async () => {
      try {
        // setLoading(true);
        let accountData = [];
        const length = await readContract({ address: LPLockerAddress, abi: LPLockerAbi, functionName: 'getUserNumLockedTokens', args: [address] });
        console.log('debug->length', length)
        for (let i = 0; i < Number(length); i++) {
          const LockedTokenAddress = await readContract({ address: LPLockerAddress, abi: LPLockerAbi, functionName: 'getUserLockedTokenAtIndex', args: [address, i] });
          const UserNumberLocksForToken = await readContract({ address: LPLockerAddress, abi: LPLockerAbi, functionName: 'getUserNumLocksForToken', args: [address, LockedTokenAddress] });
          for (let j = 0; j < Number(UserNumberLocksForToken); j++) {
            const LockData = await readContract({ address: LPLockerAddress, abi: LPLockerAbi, functionName: 'getUserLockForTokenAtIndex', args: [address, LockedTokenAddress, j] })
            const lockAmount = '0x' + Number(LockData[1]).toString(16);
            const LockedTokenAddress1 = await readContract({ address: LockedTokenAddress, abi: LPTokenAbi, functionName: 'token0' });
            const LockedTokenAddress2 = await readContract({ address: LockedTokenAddress, abi: LPTokenAbi, functionName: 'token1' });
            const symbol1 = await readContract({ address: LockedTokenAddress1, abi: TokenAbi, functionName: 'symbol' });
            const symbol2 = await readContract({ address: LockedTokenAddress2, abi: TokenAbi, functionName: 'symbol' });
            let leftTime = 0;
            if (Number(LockData[3]) * 1000 > Number(new Date().getTime())) {
              leftTime = ((Number(LockData[3]) * 1000 - Number(new Date().getTime())) / 3600000).toFixed(0);
            }
            accountData.push(
              <>
                <div className='accountData'>
                  <div className='accountDetail'>
                    <p><b>{symbol1}</b> / {symbol2}</p>
                  </div>
                </div>
                <div className='withdrawContent'>

                  <div className='accountData'>
                    <div className='accountDetail'>
                      <p>Locked Time : &nbsp;</p>
                      <p>{new Date(Number(LockData[0]) * 1000).toLocaleString()}</p>
                    </div>
                    <div className='accountDetail'>
                      <p>UnLock Time : &nbsp;</p>
                      <p>{new Date(Number(LockData[3]) * 1000).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='accountData'>
                    <div className='accountDetail'>
                      <p>Locked Amount :  &nbsp;</p>
                      <p>{Number(ethers.utils.formatEther(LockData[1]))}</p>
                    </div>
                    {/* <div className='accountDetail'>
                      <p>Initial Locked Amount :  &nbsp;</p>
                      <p>{Number(ethers.utils.formatEther(LockData[2]))}</p>
                    </div> */}
                  </div>
                  <section className="LockBox">
                    {
                      leftTime === 0 ?
                        confirming === false ?
                          <button disabled={false} onClick={(e) => onLpTokenWithdraw(LockedTokenAddress, j, Number(LockData[4]), lockAmount)} className="LockButton">
                            Withdraw LP Now!
                          </button>
                          :
                          <>
                            <p className='Text1'>Withdrawing</p>
                            <ClipLoader
                              color={'#36d7b7'}
                              loading={confirming}
                              size={25}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </>
                        :
                        <button disabled={true} onClick={(e) => onLpTokenWithdraw(LockedTokenAddress, j, Number(LockData[4]), lockAmount)} className="LockButton">
                          You have to wait {leftTime} hours more
                        </button>
                    }
                  </section>
                </div>
                <div className="bnbPoolContentLine"></div>
              </>
            )
          }
        }
        setAccountDatas(accountData)
        setLoading(false);
      } catch (e) {
        console.error(e)
      }
    }
    if (isConnected === true && chain?.id === 5) {
      FetchLockerData();
    }
  }, [isConnected, address, chain, confirming])


  const onLpTokenWithdraw = async (lpToken, index, lockId, amount) => {
    try {
      setConfirming(true);
      const withdraw = await writeContract({ address: LPLockerAddress, abi: LPLockerAbi, functionName: 'withdraw', args: [lpToken, index.toString(), lockId.toString(), amount] })
      const withdrawData = await waitForTransaction({
        hash: withdraw.hash
      })
      console.log('withdrawData', withdrawData)
      setConfirming(false);
    } catch (err) {
      setConfirming(false);
    }
  };

  return (
    <main>
      {/* < Header /> */}
      <div className="GlobalContainer">
        {address ?
          chain?.id === 5 ?
            loading === false ?
              <div className="MainDashboard">
                <section className="DepositBoxHeader">
                  <p className="ContractContentTextTitle">Account Dashboard</p>
                </section>
                <section className="ContactBox">
                  <>
                    <section className="ContractContainer">
                      {accountDatas}
                    </section>
                  </>
                </section>
              </div>
              :
              <div className='LoadingBox'>
                <p className='Text1'>
                  Fetching...
                </p>
                <BounceLoader
                  color={'#36d7b7'}
                  loading={loading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            :
            <section className="ConnectWalletBox">
              <p className="FirstNote">Please change chain</p>
              <div className="ConnectWalletBoxButton">
              </div>
            </section>
          :
          <section className="ConnectWalletBox">
            <p className="FirstNote">Please connect wallet first</p>
            <div className="ConnectWalletBoxButton">
            </div>
          </section>
        }
      </div>
      <Footer />
    </main >
  )
}

export default App
