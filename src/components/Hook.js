import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useWalletData = (
  ethAddress,
  transactionHashes,
  usdcAddress,
  usdtAddress
) => {
  const [ethBalance, setEthBalance] = useState('');
  const [usdcBalance, setUsdcBalance] = useState('');
  const [usdtBalance, setUsdtBalance] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = process.env.REACT_APP_RPC_URL;
      const provider = new ethers.JsonRpcProvider(url);
      const balance = await provider.getBalance(ethAddress);

      const transactions = await Promise.all(
        transactionHashes.map(async (hash) => {
          return provider.getTransaction(hash);
        })
      );

      const usdcAbi = ['function balanceOf(address) view returns (uint256)'];
      const usdtAbi = ['function balanceOf(address) view returns (uint256)'];
      const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, provider);
      const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);

      const usdcBalance = await usdcContract.balanceOf(ethAddress);
      const usdtBalance = await usdtContract.balanceOf(ethAddress);

      setEthBalance(ethers.formatEther(balance));
      setTransactions(transactions);
      setUsdcBalance(ethers.formatUnits(usdcBalance, 6));
      setUsdtBalance(ethers.formatUnits(usdtBalance, 6));
    };

    fetchData();
  }, [ethAddress, transactionHashes, usdcAddress, usdtAddress]);

  return {
    ethBalance,
    usdcBalance,
    usdtBalance,
    transactions,
  };
};
