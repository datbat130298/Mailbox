import { useEffect, useState } from 'react';
import { SignatureType } from '../../../../../../app/Slices/signatureSlice';
import useSelector from '../../../../../Hooks/useSelector';
import SignatureLabel from './SignaturelLabel';
import SignatureWrite from './SignatureWrite';

const SignatureContainer = () => {
  const [selectSig, setSelectSig] = useState<SignatureType | null>(null);
  const [dataSig, setDataSig] = useState<SignatureType[]>([]);

  const dataSignature = useSelector((state) => state.signature.signatureData);

  const handleSelectSig = (sig: SignatureType) => {
    setSelectSig(sig);
  };

  useEffect(() => {
    setDataSig(dataSignature);
  }, [dataSignature]);

  return (
    <div className="mt-5 flex h-screen w-full">
      <div className="w-64 border-r border-gray-300 pr-4">
        <SignatureLabel data={dataSig} selected={selectSig} onSelect={handleSelectSig} />
      </div>
      <div className="w-2/4 pl-8">
        <SignatureWrite signature={selectSig} />
      </div>
    </div>
  );
};

export default SignatureContainer;
