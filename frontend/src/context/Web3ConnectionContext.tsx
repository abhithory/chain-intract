"use client";
import { createContext, useContext } from 'react';
import { useAddress, useSigner, useStorage } from '@thirdweb-dev/react';
import { Contract, Signer, ethers } from 'ethers';
import { AbiFunction, ContractAbi } from '@/utils/types/AbiType';
import { FunctionCallData } from '@/utils/types/Web3Related';

type Web3ContextProps = {
    address: string | undefined;
    callFunctionRead: (
        address: string,
        abi: ContractAbi,
        functionItem: FunctionCallData,
    ) => Promise<boolean>;
    callFunctionWrite: (
        address: string,
        abi: ContractAbi,
        functionItem: FunctionCallData,
    ) => Promise<boolean>;
}

export const Web3ConnectionContext = createContext<Web3ContextProps>({
    address: '',
    callFunctionRead: async () => false,
    callFunctionWrite: async () => false,
});

const Web3ConnectionWrapper = ({ children }: any) => {
    const address = useAddress();
    const signer = useSigner();

    function getContract(address: string, abi: ContractAbi): Contract {
        const contract = new ethers.Contract(address, abi, signer);
        return contract;
    }

    async function callFunctionRead(
        address: string,
        abi: ContractAbi,
        functionData: FunctionCallData,
    ): Promise<any> {
        try {
            const _contract = getContract(address, abi);
            const data = await _contract[functionData.name](
                ...functionData.inputValues,
                {
                    value: functionData.vaule || '0',
                },
            );
            return data;
        } catch (error) {
            console.log('callFunctionRead error', error);
            throw error;
        }
    }

    async function callFunctionWrite(
        address: string,
        abi: ContractAbi,
        functionData: FunctionCallData,
    ): Promise<boolean> {
        try {
            const _contract = getContract(address, abi);
            const _tx = await _contract[functionData.name](...functionData.inputValues, {
                value: functionData.vaule || '0',
            });
            await _tx.wait();
            return true;
        } catch (error) {
            console.log('callFunctionWrite error', error);
            throw error;
        }
    }

    return (
        <Web3ConnectionContext.Provider
            value={{
                address,
                callFunctionRead,
                callFunctionWrite,
            }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;

export const useWeb3Connection = () => useContext(Web3ConnectionContext);
