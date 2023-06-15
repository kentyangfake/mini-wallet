import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
const address = '0x33b8287511ac7F003902e83D642Be4603afCd876';
const Wallet = () => {
  const [balance, setBalance] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/hJ1r6qGO2qfTbEeuGb-i8GT6ljgksCDh');
      const balance = await provider.getBalance(address);
      const transactionHashes = [
        '0x1eb6aab282d701d3d2eeb762bd426df625767e68ebf9c00b484905be1343304e',
        '0xf134054861dccf1f211e6fd92808475b2fb290489a4e41bc008260d8cc58b9f9'
      ];
      const transactions = await Promise.all(transactionHashes.map(async (hash) => {
        return provider.getTransaction(hash);
      }));

      setBalance(ethers.formatEther(balance));
      setTransactions(transactions);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Wallet Information</h2>
      <p>Address: {address}</p>
      <p>Balance: {balance} ETH</p>

      <h2>Transaction History</h2>
      {transactions.map((transaction) => (
        <div key={transaction.hash}>
          <p>Transaction Hash: {transaction.hash}</p>
          <p>Block Number: {transaction.blockNumber}</p>
          <p>From Address: {transaction.from}</p>
          <p>To Address: {transaction.to}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Wallet;