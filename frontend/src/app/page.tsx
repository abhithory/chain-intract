'use client';
import Image from 'next/image';
import { ERC1155 } from './../assets/abis/ERC1155';
import DisclosureContainer from '@/components/Disclosure';
import SelectList from '@/components/Select/SelectList';
import Web3Input from '@/components/inputs/Web3Input';
import Button from '@/components/Buttons/Button';
import { useEffect, useState } from 'react';
import { AbiFunction, ContractAbi } from '@/utils/types/AbiType';
import { SelectItem } from '@/utils/types/Select';
import { ERC721 } from '@/assets/abis/ERC721';
import { ERC20 } from '@/assets/abis/ERC20';
import { useWeb3Connection } from '@/context/Web3ConnectionContext';
import { ConnectWallet, useChain } from '@thirdweb-dev/react';
import HandleContractIntraction from '@/components/UiSections/ContractIntraction/HandleContractIntraction';

const chains = [
  { name: 'Select Blockchain' },
  { name: 'Ethereum' },
  { name: 'Goerli' },
  { name: 'Polygon' },
];

const abis = [
  { name: 'Select ABIs' },
  { name: 'ERC1155' },
  { name: 'ERC721' },
  { name: 'ERC20' },
];

export default function Home() {
  const { address, callFunctionRead, callFunctionWrite } = useWeb3Connection();
  const chain = useChain();

  const [contractAddress, setContractAddress] = useState('');

  const [selectedAbiOption, setSelectedAbiOption] = useState<SelectItem>(
    abis[0],
  );

  const [loadingTx, setLoadingTx] = useState(false);

  const getABI = (value: string): ContractAbi | null => {
    if (value === 'ERC1155') {
      return ERC1155;
    } else if (value === 'ERC721') {
      return ERC721;
    } else if (value === 'ERC20') {
      return ERC20;
    } else {
      return null;
    }
  };
  const abiOfContract = getABI(selectedAbiOption.name);

  const handleForm = async (event: React.FormEvent, item: AbiFunction) => {
    event.preventDefault();
    if (item.type !== 'function' || !address || !abiOfContract) return;
    setLoadingTx(true);
    const inputValues = item.inputs.map((input) => {
      return (event.currentTarget as any)[input.name].value;
    });
    try {
      let result;
      if (item.stateMutability === 'view') {
        result = await callFunctionRead(contractAddress, abiOfContract, {
          name: item.name,
          inputValues,
        });
        console.log('result', Number(result));
      } else {
        result = await callFunctionWrite(contractAddress, abiOfContract, {
          name: item.name,
          inputValues,
        });
        console.log('result', result);
      }
      setLoadingTx(false);
    } catch (error) {
      setLoadingTx(false);
      console.error('handleForm:', error);
    }
  };
  return (
    <main className="flex items-center justify-center flex-col ">
      <HandleContractIntraction />
    </main>
  );
}
