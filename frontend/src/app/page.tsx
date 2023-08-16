"use client"
import Image from 'next/image';
import { ERC1155 } from './../assets/abis/ERC1155';
import DisclosureContainer from '@/components/Disclosure';
import SelectList from '@/components/Select/SelectList';
import Web3Input from '@/components/inputs/Web3Input';
import Button from '@/components/Buttons/Button';
import { useEffect, useState } from 'react';
import { ContractAbi } from '@/utils/types/AbiType';
import { SelectItem } from '@/utils/types/Select';
import { ERC721 } from '@/assets/abis/ERC721';
import { ERC20 } from '@/assets/abis/ERC20';

const chains = [
  {name: "Select Blockchain"},
  {name: "Ethereum"},
  {name: "Polygon"},
]

const abis = [
  {name: "Select ABIs"},
  {name: "ERC1155"},
  {name: "ERC721"},
  {name: "ERC20"},
]

export default function Home() {

  const [selectedAbiOption, setSelectedAbiOption] = useState<SelectItem>(abis[0]);
  const [selectedChainOption, setSelectedChainOption] = useState<SelectItem>(chains[0])

  const getABI = (value:string):ContractAbi | null => {
    if (value === "ERC1155") {
      return ERC1155
    } else if(value === "ERC721"){
      return ERC721
    }
    else if(value === "ERC20"){
      return ERC20
    }
    else {
      return null
    }
  }
  return (
    <main className="flex items-center justify-center flex-col ">

      <div className="w-8/12 my-12 flex flex-col gap-4">
      <SelectList items={chains} selected={selectedChainOption} setSelected={setSelectedChainOption} />
      <SelectList items={abis} selected={selectedAbiOption} setSelected={setSelectedAbiOption} />
      <Web3Input label={"Enter Contract Address"} parameterType={"address"} onChange={(value)=>{}}  />
        {getABI(selectedAbiOption.name)?.map((item, key) => {
          return (
            item.type === 'function' &&  (
              <div key={key} className="">
                <DisclosureContainer title={item.name}>
                  {item.inputs.map((inputItem, inputkey) => {
                    return inputItem?.type && <Web3Input key={inputkey} label={inputItem.name} parameterType={inputItem.type} onChange={(value)=>{}}  />;
                  })}
                <Button label='Submit' onClick={()=>{}} />
                </DisclosureContainer>
              </div>
            )
          );
        })}
      </div>
    </main>
  );
}
