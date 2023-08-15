export type AbiParameterType =
  | 'address'
  | 'address[]'
  | 'bool'
  | 'bool[]'
  | 'uint8'
  | 'uint16'
  | 'uint32'
  | 'uint64'
  | 'uint128'
  | 'uint256'
  | 'uint256[]'
  | 'int8'
  | 'int16'
  | 'int32'
  | 'int64'
  | 'int128'
  | 'int256'
  | 'bytes[]'
  | 'bytes'
  | 'bytes4' 
  | 'string'
  | 'string[]'
  ;


export type AbiEventInput = {
  indexed: boolean;
  internalType: AbiParameterType;
  name: string;
  type: AbiParameterType;
};

export type AbiEvent = {
  anonymous: boolean;
  inputs: AbiEventInput[];
  name: string;
  type: 'event';
};

export type AbiFunctionInput = {
  internalType: AbiParameterType;
  name: string;
  type: AbiParameterType;
};

export type AbiFunctionOutput = {
  internalType: AbiParameterType;
  name: string;
  type: AbiParameterType;
};

export type AbiFunction = {
  inputs: AbiFunctionInput[];
  outputs?: AbiFunctionOutput[];
  name: string;
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
  type: 'function';
};

export type AbiConstructor = {
  inputs: AbiFunctionInput[];
  stateMutability: 'nonpayable';
  type: 'constructor';
};

export type AbiFallback = {
  stateMutability: 'payable';
  type: 'fallback';
};

export type AbiReceive = {
  stateMutability: 'payable';
  type: 'receive';
};

export type AbiEntry =
  | AbiEvent
  | AbiFunction
  | AbiConstructor
  | AbiFallback
  | AbiReceive;

export type ContractAbi = AbiEntry[];
