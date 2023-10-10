import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { uploadSettingSidebar } from '../../../../app/Services/Setting/Seting';
import useNotify from '../../../Hooks/useNotify';
import Button from '../../Components/Button';
import { TitleLabelTable, ValueLabelTable } from './Tabs/LabelTab';

interface TableSettingProps {
  titles: TitleLabelTable[];
  values: ValueLabelTable[];
  handleChange: (arr: ValueLabelTable[]) => void;
}

const Table = ({ titles, values, handleChange }: TableSettingProps) => {
  const [valueArray, setValueArray] = useState<ValueLabelTable[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const toast = useNotify();

  useEffect(() => {
    setValueArray(values);
  }, [values]);

  const handleClickDisplay = (index: number, keyObj: string) => {
    const newArr = cloneDeep(valueArray).map((item, i) => {
      if (i === index) {
        const newDisplay = item.display.map((displayItem) => {
          const keyCur = Object.keys(displayItem)[0];
          if (keyCur === keyObj) {
            return Object.assign(displayItem, { [keyCur]: true });
          }
          return Object.assign(displayItem, { [keyCur]: false });
        });
        const newDis = { display: newDisplay };

        const newArrItem = Object.assign(item, newDis);
        return newArrItem;
      }
      return item;
    });
    setValueArray(newArr);
    handleChange(newArr);
  };

  const handleChangeSave = useCallback(() => {
    setIsLoading(true);
    uploadSettingSidebar(valueArray)
      .then(() => toast.success(t('save_setting_success')))
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsLoading(false));
  }, [valueArray]);

  return (
    <>
      <table className="w-full">
        <thead className="w-full">
          {titles.map((item) => (
            <th className="w-32 py-2 pl-2 text-left text-sm font-medium text-slate-900" key={nanoid()}>
              {item.title}
            </th>
          ))}
        </thead>
        {valueArray.map((item, index) => (
          <tr className="hover:bg-gray-100" key={nanoid()}>
            <td className="py-1.5 pl-2 text-sm text-slate-600">{t(item.name)}</td>
            <td className={twMerge('pl-2 text-base')}>
              {item.display && (
                <div className="flex w-fit rounded-md border border-gray-300 text-sm">
                  {item.display.map((value) => (
                    <div
                      className={twMerge(
                        'm-0.5 w-28 cursor-text rounded-md bg-blue-500 py-1 text-center text-sm font-normal lowercase text-white transition duration-300',
                        !Object.values(value)[0] &&
                          'cursor-pointer bg-inherit font-normal text-slate-700 hover:bg-gray-200',
                      )}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (!Object.values(value)[0]) {
                          handleClickDisplay(index, Object.keys(value)[0]);
                        }
                      }}
                    >
                      {Object.keys(value)}
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>
        ))}
      </table>
      <div className="my-2 ml-2">
        <Button className="h-7 rounded-md" onClick={handleChangeSave} isLoading={isLoading}>
          {t('save_setting')}
        </Button>
      </div>
    </>
  );
};

export default Table;
