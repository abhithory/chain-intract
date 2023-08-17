import { AbiParameterType } from './AbiType';

export type FuntionInputValue = string | number | boolean;

export type FunctionCallData = {
  name: string;
  inputValues: FuntionInputValue[];
  vaule?: string;
};

export type FunctionCallResult = {
  type: AbiParameterType;
  value: any;
};
