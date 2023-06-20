import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { ValueTableLabelEnum } from '../../../../app/Enums/commonEnums';

interface ValueLabelTable {
  id: number;
  name: string;
  value?: ValueTableLabelEnum;
}

interface TitleLabelTable {
  id: number;
  title: string;
}

interface LabelTableProps {
  titles: TitleLabelTable[];
  values: ValueLabelTable[];
}

const LabelTable = ({ titles, values }: LabelTableProps) => {
  const [valueArray, setValueArray] = useState<ValueLabelTable[]>([]);

  const { t } = useTranslation();
  const displayValue = [
    {
      id: 1,
      value: ValueTableLabelEnum.SHOW,
      name: t('show'),
    },
    {
      id: 2,
      value: ValueTableLabelEnum.HIDE,
      name: t('hide'),
    },
    {
      id: 3,
      value: ValueTableLabelEnum.SHOW_IF_UNREAD,
      name: t('show_if_unread'),
    },
  ];

  useEffect(() => {
    if (values) {
      setValueArray(values);
    }
  }, [values]);

  const handleClickDisplay = useCallback(
    async (index: number, value: ValueTableLabelEnum) => {
      const newArr = await valueArray.map((item, i) => {
        if (i === index) {
          const newItem = Object.assign(item, { value });
          return newItem;
        }
        return item;
      });
      setValueArray(newArr);
    },
    [valueArray],
  );

  return (
    <div className="h-full w-3/4 border-b border-gray-200 pb-5 pt-3">
      <table className="w-full">
        <thead className="w-1/4">
          {titles.map((item) => (
            <th className=" px-6 py-2 text-left text-base font-medium text-slate-900">{item.title}</th>
          ))}
        </thead>
        {valueArray.map((item, index) => (
          <tr className="hover:bg-gray-100">
            <td className="py-2.5 pl-6 text-sm text-slate-600">{item.name}</td>
            <td className={twMerge('py-1.5 pl-6 text-base')}>
              {item.value && (
                <div className="flex w-fit rounded-md border border-gray-300 text-sm">
                  {displayValue.map((value) => (
                    <div
                      className={twMerge(
                        'm-0.5 w-28 cursor-text rounded-md bg-blue-500 py-1 text-center text-sm font-normal lowercase text-white transition duration-300',
                        item.value !== value.value &&
                          'cursor-pointer bg-inherit font-normal text-slate-700 hover:bg-gray-200',
                      )}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleClickDisplay(index, value.value)}
                    >
                      {value.name}
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default LabelTable;
