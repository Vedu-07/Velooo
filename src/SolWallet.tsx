import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

// Define the props type for mnemonic
interface SolanaWalletProps {
    mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<string[]>([]);

    const addWallet = async () => {
        try {
            // Generate seed from mnemonic
            const seed = await mnemonicToSeed(mnemonic);

            // Derive key using BIP44 path
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString('hex')).key;

            // Convert Buffer to Uint8Array for nacl
            const secretKey = nacl.sign.keyPair.fromSeed(new Uint8Array(derivedSeed)).secretKey;

            // Create Solana keypair
            const keypair = Keypair.fromSecretKey(secretKey);

            // Update state with new public key
            setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    };

    return (
        <div>
            <button onClick={addWallet}>Add SOL Wallet</button>
            {publicKeys.map((p, index) => (
                <div key={index}>{p}</div>
            ))}
        </div>
    );
}
