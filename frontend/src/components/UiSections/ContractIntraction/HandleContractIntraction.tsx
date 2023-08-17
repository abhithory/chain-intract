'use client';
import Image from 'next/image';
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
import { ERC1155 } from '@/assets/abis/ERC1155';
import FunctionCallForm from './FunctionCallForm';



const abis = [
  { name: 'Select ABIs' },
  { name: 'ERC1155' },
  { name: 'ERC721' },
  { name: 'ERC20' },
];

export default function HandleContractIntraction() {

  const { address, callFunctionRead, callFunctionWrite } = useWeb3Connection();
  const chain = useChain();


  const [contractAddress, setContractAddress] = useState("");

  const [selectedAbiOption, setSelectedAbiOption] = useState<SelectItem>(
    abis[0],
  );


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

  const handleFunctionForm = async (event: React.FormEvent, item: AbiFunction) => {
    event.preventDefault();
    if (item.type !== 'function' || !address || !abiOfContract) return;
    const inputValues = item.inputs.map((input) => {
      return (event.currentTarget as any)[input.name].value;
    });
    try {
      let result;
      if (item.stateMutability === "view") {
        result = await callFunctionRead(contractAddress, abiOfContract, {
          name: item.name,
          inputValues
        });
      } else {
        result = await callFunctionWrite(contractAddress, abiOfContract, {
          name: item.name,
          inputValues
        });
      }
      return result;
    } catch (error) {
      throw error
    }
  }


  return (
      <div className="w-8/12 my-12 flex flex-col gap-4">

        <ConnectWallet />

        {address &&
          <h2>Connected With {chain?.name}. Change your network to intract with other blockchains</h2>
        }

        <Web3Input
          label={'Enter Contract Address'}
          parameterType={'address'}
          onChange={(value) => setContractAddress(value)}
        />

        <SelectList
          items={abis}
          selected={selectedAbiOption}
          setSelected={setSelectedAbiOption}
        />
        {abiOfContract?.map((item, key) => {
          return (
            item.type === 'function' && (
              <FunctionCallForm item={item} key={key} handleForm={handleFunctionForm} />
            )
          );
        })}
      </div>
  );
}
