import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SelectedItem from './SelectItem';

interface EmailType {
  id: string;
  email: string;
  avatar?: string;
}

const CustomSelectMultiEmail = () => {
  const [arrayEmail, setArrayEmail] = useState<Array<EmailType>>([]);
  const [value, setValue] = useState('');

  const validateEmail = (mail: string) => {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (_.isEmpty(value)) return;
    if (e.key === 'Enter' && validateEmail(value)) {
      setArrayEmail((prev) => [...prev, { id: nanoid(), email: value }]);
      setValue('');
    }
  };

  const handleClickRemove = (id: string) => {
    let array = [];
    array = arrayEmail.filter((item) => item.id !== id);
    setArrayEmail(array);
  };

  return (
    <div className={twMerge('border-gray-1 flex items-center justify-start gap-2 border-b pb-1.5')}>
      {!_.isEmpty(arrayEmail) && (
        <div className="flex justify-start gap-2">
          {arrayEmail.map((item: EmailType) => (
            <SelectedItem key={item.id} email={item.email} id={item.id} onRemove={handleClickRemove} />
          ))}
        </div>
      )}
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        className="h-full w-full outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CustomSelectMultiEmail;
