import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

// Define the props type for mnemonic
interface EthWalletProps {
    mnemonic: string;
}

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<string[]>([]);

    return (
        <div>
            <button onClick={async function () {
                try {
                    // Generate seed from mnemonic
                    const seed = await mnemonicToSeed(mnemonic);

                    // Derive path using BIP44 for Ethereum
                    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                    const hdNode = HDNodeWallet.fromSeed(seed);

                    // Derive the child node for the current index
                    const child = hdNode.derivePath(derivationPath);

                    // Create a wallet using the derived private key
                    const privateKey = child.privateKey;
                    const wallet = new Wallet(privateKey);

                    // Update the state with the new address
                    setCurrentIndex(currentIndex + 1);
                    setAddresses([...addresses, wallet.address]);
                } catch (error) {
                    console.error("Error generating ETH wallet:", error);
                }
            }}>
                Add ETH wallet
            </button>

            {addresses.map((address, index) => (
                <div key={index}>
                    Eth - {address}
                </div>
            ))}
        </div>
    );
}
