"use client"
import Image from 'next/image';
import { ERC1155 } from './../assets/abis/ERC1155';
import DisclosureContainer from '@/components/Disclosure';
import SelectList from '@/components/Select/SelectList';
import Web3Input from '@/components/inputs/Web3Input';

export default function Home() {
  const chains = [
    {name: "Select Blockchain"},
    {name: "Ethereum"},
    {name: "Polygon"},
  ]
  return (
    <main className="flex items-center justify-center flex-col ">

      <div className="w-8/12 my-12 flex flex-col gap-4">
      <SelectList items={chains} />
        {ERC1155.map((item, key) => {
          return (
            item.type === 'function' &&  (
              <div key={key} className="">
                <DisclosureContainer title={item.name}>
                  {item.inputs.map((inputItem, inputkey) => {
                    return inputItem?.type && <Web3Input key={inputkey} label={inputItem.name} parameterType={inputItem.type} onChange={(value)=>{}}  />;
                  })}
                </DisclosureContainer>
              </div>
            )
          );
        })}
      </div>
    </main>
  );
}
