import Button from '@/components/Buttons/Button';
import DisclosureContainer from '@/components/Disclosure';
import Web3Input from '@/components/inputs/Web3Input';
import { useWeb3Connection } from '@/context/Web3ConnectionContext';
import { AbiFunction } from '@/utils/types/AbiType';
import React, { useState } from 'react'

type FunctionCallFormProps = {
    item: AbiFunction;
    handleForm: (event: React.FormEvent, item: AbiFunction) => any;
}

function FunctionCallForm({item, handleForm}: FunctionCallFormProps) {
  const [loadingTx, setLoadingTx] = useState(false);

  const executeFunction = async (event: React.FormEvent) => {
    try {
        setLoadingTx(true);
        const result = await handleForm(event, item);
        console.log("result: ",result);
        setLoadingTx(false);
    } catch (error) {
        setLoadingTx(false);
        console.log("executeFunction",error);
        
    }
  }
  return (
    <div>
             <DisclosureContainer title={item.name}>
                  <form
                    onSubmit={executeFunction}
                  >
                    {item.inputs.map((inputItem, inputkey) => {
                      return (
                        inputItem?.type && (
                          <Web3Input
                            key={inputkey}
                            label={inputItem.name}
                            id={inputItem.name}
                            parameterType={inputItem.type}
                            onChange={(value) => { }}
                          />
                        )
                      );
                    })}
                    <Button label="Submit Tx" type="submit" loading={loadingTx} />
                  </form>
                </DisclosureContainer>
    </div>
  )
}

export default FunctionCallForm