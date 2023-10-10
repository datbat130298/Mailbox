import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editSignature, SignatureType } from '../../../../../../app/Slices/signatureSlice';
import useDispatch from '../../../../../Hooks/useDispatch';
import Button from '../../../../Components/Button';
import EditorWriterCompose from '../../../../Components/ComposePopup/Components/EditorWriterCompose';

interface SignatureWriteProp {
  signature: SignatureType | null;
}

const SignatureWrite = ({ signature }: SignatureWriteProp) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [data, setData] = useState('');
  const handleChange = (value: string) => {
    setData(value);
  };

  useEffect(() => {
    if (signature) {
      setData(signature.value);
    }
  }, [signature]);

  const isShowButton = useMemo(() => {
    if (data && !_.isEmpty(signature) && data !== signature.value) {
      return true;
    }
    return false;
  }, [data, signature]);

  const handleSave = useCallback(() => {
    if (!_.isEmpty(signature)) {
      dispatch(
        editSignature({
          id: signature.id,
          value: data,
          label: signature.label,
        }),
      );
    }
  }, [data, signature]);

  useEffect(() => {
    const ckeditor = document.getElementById('signature');
    const delay = setTimeout(() => {
      const toolbar = ckeditor?.querySelector<HTMLDivElement>('.ck.ck-toolbar');
      if (toolbar) {
        toolbar.style.position = 'static';
        toolbar.style.visibility = 'unset';
        toolbar.style.boxShadow = 'none';
      }
    }, 200);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="flex h-full w-[542px] flex-col">
      <div className="h-1/3 w-full overflow-hidden rounded-md border border-gray-300">
        <EditorWriterCompose
          data={data}
          id="signature"
          isShowToolbar={false}
          handleChangeEditor={handleChange}
          handleChangeBlur={undefined}
          isLoading={undefined}
          isDisabled={undefined}
        />
      </div>
      {isShowButton && (
        <Button className="ml-auto mt-6 h-10 w-36" onClick={handleSave}>
          {t('save_change')}
        </Button>
      )}
    </div>
  );
};

export default SignatureWrite;
