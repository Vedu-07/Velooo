import { useState } from 'react';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolWallet';
import { EthWallet } from './EthWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Multi-Chain Wallet Generator
        </h1>

        {/* Seed Phrase Section */}
        <div className="mb-6 text-center">
          <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="mnemonic">
            Generated Seed Phrase
          </label>
          <input
            id="mnemonic"
            type="text"
            value={mnemonic}
            readOnly
            className="w-full text-center p-3 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xl font-mono"
            placeholder="Click the button to generate a seed phrase"
          />
        </div>

        {/* Create Seed Phrase Button */}
        <div className="text-center mb-8">
          <button
            onClick={async function () {
              const mn = generateMnemonic();
              setMnemonic(mn);
            }}
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Create Seed Phrase
          </button>
        </div>

        {/* Wallets Partition */}
        {mnemonic && (
          <div className="grid grid-cols-2 gap-8">
            {/* Solana Wallet Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-indigo-600 mb-4 text-center">
                Solana Wallet
              </h2>
              <SolanaWallet mnemonic={mnemonic} />
            </div>

            {/* Ethereum Wallet Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-indigo-600 mb-4 text-center">
                Ethereum Wallet
              </h2>
              <EthWallet mnemonic={mnemonic} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
