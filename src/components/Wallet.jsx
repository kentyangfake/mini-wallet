import React from 'react';
import {
  ethAddress,
  transactionHashes,
  usdcAddress,
  usdtAddress,
} from './addresses';
import { useWalletData } from './Hook';

const Wallet = () => {
  const { ethBalance, usdcBalance, usdtBalance, transactions } = useWalletData(
    ethAddress,
    transactionHashes,
    usdcAddress,
    usdtAddress
  );

  return (
    <div className="w-[600px]">
      <div className="font-bold mt-10 mb-2">Account Info</div>
      <div className="flex flex-col p-10 gap-4 bg-zinc-200">
        <div className="flex justify-between p-4 bg-white">
          <p>Account Address</p>
          <p>{ethAddress.slice(0, 6) + '...' + ethAddress.slice(-7)}</p>
        </div>
        <div className="flex justify-between p-4 bg-white">
          <p>ETH Balance</p>
          <p>{ethBalance} ETH</p>
        </div>
      </div>

      <div className="font-bold mt-10 mb-2">Transactions</div>
      <div className="flex flex-col p-10 gap-4 bg-zinc-200">
        <div className="flex justify-between px-4">
          <p>TX Hash</p>
          <p>Block</p>
        </div>
        {transactions.map((transaction) => (
          <div className="flex flex-col p-4 bg-white" key={transaction.hash}>
            <div className="flex justify-between">
              <p>
                {transaction.hash.slice(0, 6) +
                  '...' +
                  transaction.hash.slice(-7)}
              </p>
              <p>{transaction.blockNumber}</p>
            </div>
            <hr className="my-2 border-2" />
            <div className="flex pb-2">
              <span className="flex pr-2 text-sm self-end">From:</span>{' '}
              {transaction.from}
            </div>
            <div className="flex pb-2">
              <span className="flex pr-2 text-sm self-end">To:</span>{' '}
              {transaction.to}
            </div>
          </div>
        ))}
      </div>
      <div className="font-bold mt-10 mb-2">Token Holdings</div>
      <div className="flex flex-col p-10 gap-4 bg-zinc-200">
        <div className="flex justify-between p-4 bg-white">
          <p>USDC Balance</p>
          <p>{usdcBalance} USDC</p>
        </div>
        <div className="flex justify-between p-4 bg-white">
          <p>USDT Balance</p>
          <p>{usdtBalance} USDT</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
