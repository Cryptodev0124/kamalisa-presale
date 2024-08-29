import Web3 from "web3";

/**
 * @returns the web3 instance based on custom provider
 */

export const getWeb3 = () => {
  return new Web3(
    Web3.givenProvider || "https://ethereum.publicnode.com/"
  );
};

export const isAddress = (address: string) => {
  return Web3.utils.isAddress(address)
}
