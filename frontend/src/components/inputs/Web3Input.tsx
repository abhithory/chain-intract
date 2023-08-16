import { AbiParameterType } from '@/utils/types/AbiType';
import React from 'react';
import Input from './Input';

type Web3InputProps = {
  label: string;
  parameterType: AbiParameterType;
  onChange: (newValue: any) => void;
  value?: any;
  id?: string;
};

function Web3Input({
  label,
  value,
  onChange,
  parameterType,
  id,
}: Web3InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const getInputType = (): string | null => {
    if (
      parameterType.startsWith('address') ||
      parameterType.startsWith('string') ||
      parameterType.startsWith('bytes')
    ) {
      return 'text';
    } else if (parameterType.startsWith('bool')) {
      return 'text';
    } else if (
      parameterType.startsWith('uint') ||
      parameterType.startsWith('int')
    ) {
      return 'number';
    } else {
      return null;
    }
  };
  return getInputType() ? (
    <Input
      label={label}
      value={value}
      onChange={handleChange}
      type={getInputType() || 'text'}
      placeholder={parameterType}
      id={id}
      name={id}
    />
  ) : (
    <div>Unsupported parameter type</div>
  );
}

export default Web3Input;
