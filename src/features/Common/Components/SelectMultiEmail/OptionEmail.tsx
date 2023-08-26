/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { UserDataType } from '../../../../app/Types/userTypes';

interface OptionEmailProp {
  data: Array<UserDataType>;
  onClickOption: (user: UserDataType) => void;
  value: string;
  defaultValue: UserDataType;
}

const getHeightLight = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part: any) => (
        <span
          style={
            part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: '#000000cc' } : {}
          }
        >
          {part}
        </span>
      ))}{' '}
    </span>
  );
};

const OptionEmail = ({ data, onClickOption, value, defaultValue }: OptionEmailProp) => {
  const [currentValue, setCurrentValue] = useState<UserDataType>();

  useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue, data]);

  useEffect(() => {
    let number = 0;
    window.addEventListener('keydown', (event) => {
      const { key } = event;
      if (key === 'Tab') event.preventDefault();
      if (key === 'ArrowDown' || key === 'Tab') {
        if (number === data.length - 1) return;
        number += 1;
        setCurrentValue(data[number]);
        return;
      }
      if (key === 'ArrowUp') {
        if (number === 0) return;
        number -= 1;
        setCurrentValue(data[number]);
      }
    });
    return () => {
      window.removeEventListener('keydown', (event) => {
        const { key } = event;
        console.log(key);
      });
    };
  }, [data]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        console.log(1);
        onClickOption(currentValue as UserDataType);
      }
    },
    [currentValue],
  );

  return (
    <div className="absolute left-5 top-9 z-50 min-w-[350px] overflow-hidden rounded-lg border border-gray-300 bg-white py-1 shadow-xl">
      {data.map((user) => (
        <div
          className={twMerge(
            'flex w-full items-center justify-start gap-2 px-2.5 py-1 hover:bg-slate-100',
            currentValue?.uuid === user.uuid && 'bg-slate-200',
          )}
          tabIndex={0}
          role="button"
          onClick={() => {
            onClickOption(user);
          }}
          key={user.uuid}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500">
            {_.isEmpty(user.avatar_img_absolute) ? (
              <p className="text-lg font-semibold uppercase">{user.email.slice(0, 1)}</p>
            ) : (
              <img alt={user.avatar_img_absolute} src="user" />
            )}
          </div>
          <div className="flex flex-col">
            {getHeightLight(user.username || user.full_name || '', value)}
            {getHeightLight(user.email || '', value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionEmail;
