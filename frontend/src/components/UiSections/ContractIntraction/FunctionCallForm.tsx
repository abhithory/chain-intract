import Button from '@/components/Buttons/Button';
import DisclosureContainer from '@/components/Disclosure';
import Web3Input from '@/components/inputs/Web3Input';
import { useWeb3Connection } from '@/context/Web3ConnectionContext';
import { AbiFunction, AbiParameterType } from '@/utils/types/AbiType';
import { FunctionCallResult } from '@/utils/types/Web3Related';
import React, { useState } from 'react';

type FunctionCallFormProps = {
  item: AbiFunction;
  handleForm: (event: React.FormEvent, item: AbiFunction) => any;
};

function FunctionCallForm({ item, handleForm }: FunctionCallFormProps) {
  const [loadingTx, setLoadingTx] = useState(false);
  const [txResult, setTxResult] = useState<FunctionCallResult[]>();
  const [txHash, setTxHash] = useState<string>();

  const executeFunction = async (event: React.FormEvent) => {
    try {
      setLoadingTx(true);
      const result = await handleForm(event, item);

      const resultValues = item.outputs?.map((output) => {
        return { type: output.type, value: formatWeb3Data(result, output.type) };
      });

      if (item.stateMutability === 'view' || item.stateMutability === 'pure') {
        setTxResult(resultValues);
      } else {
        setTxHash(result);
        // TODO: Later handle emited events + gas cost + is succefull or not
      }

      setLoadingTx(false);
    } catch (error) {
      setLoadingTx(false);
      console.log('executeFunction', error);
    }
  };

  const formatWeb3Data = (data: any, type: AbiParameterType) => {
    if (type.startsWith("uint") || type.startsWith("int")) {
        return Number(data);
    }
    return data;
  }
  return (
    <div>
      <DisclosureContainer title={item.name}>
        <form onSubmit={executeFunction}>
          {item.inputs.map((inputItem, inputkey) => {
            return (
              inputItem?.type && (
                <Web3Input
                  key={inputkey}
                  label={inputItem.name}
                  id={inputItem.name}
                  parameterType={inputItem.type}
                  onChange={(value) => {}}
                />
              )
            );
          })}
          <Button label="Submit Tx" type="submit" loading={loadingTx} />
        </form>
        <div className="">
          {txResult && (
            <>
              <h2>Result: </h2>
              {txResult?.map((output, key) => {
                return (
                  <p key={key}>
                    {output.type} : {output.value}
                  </p>
                );
              })}
            </>
          )}

          {txHash && <h2>Transaction Hash: {txHash}</h2>}
        </div>
      </DisclosureContainer>
    </div>
  );
}

export default FunctionCallForm;
