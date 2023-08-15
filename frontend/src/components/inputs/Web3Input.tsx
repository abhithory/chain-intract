import { AbiParameterType } from '@/utils/types/AbiType';
import React from 'react'
import Input from './Input';

type Web3InputProps =  {
    label: string;
    parameterType: AbiParameterType;
    value?: any; // You can set an appropriate type for value based on the parameter type
    onChange: (newValue: any) => void;
  };

  
  
function Web3Input({ label,value, onChange, parameterType }: Web3InputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      };

      const getInputType = ():string | null =>{
        if ( parameterType.startsWith("address") || parameterType.startsWith("string") || parameterType.startsWith("bytes")) {
            return "text";
          } else if (parameterType.startsWith("bool")) {
            return "text";
          } else if (parameterType.startsWith('uint') || parameterType.startsWith('int')) {
            return "number";
          } else {
            return null;
          }
      }
      return(
        getInputType() ?
        <Input label={label} value={value} onChange={handleChange} type={getInputType() || "text"} placeholder={parameterType}  />
        :
        <div>Unsupported parameter type</div>
      )


}

export default Web3Input