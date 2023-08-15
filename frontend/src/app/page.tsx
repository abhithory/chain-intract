import Image from 'next/image'
import { ERC1155 } from './../assets/abis/ERC1155';
import Input from '@/components/inputs/Input';
import DisclosureContainer from '@/components/Disclosure';

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="w-8/12 my-12 flex flex-col gap-4">
      {ERC1155.map((item,key)=>{
        return(
          item.type === "function" &&(
          <div className="">
        <DisclosureContainer title={item.name}>
          {item.inputs.map((inputItem,inputkey)=>{
            return (
              <Input key={inputkey} label={inputItem.name} />
              )
          })}

        </DisclosureContainer>
          </div>
            )
        )
      })}
      </div>
    </main>
  )
}
