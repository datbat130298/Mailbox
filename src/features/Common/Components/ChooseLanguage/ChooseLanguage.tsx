import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { SelectPositionEnum } from '../../../../app/Enums/commonEnums';
import { LanguageService } from '../../../../app/Services';
import { FlagType } from '../../../../app/Types/commonTypes';
import { OptionOP, SelectOP } from '../Select';

interface ChooseLanguageProps {
  language: string;
  onChangeLanguage: (lang: string) => void;
}

const ChooseLanguage = ({ language, onChangeLanguage }: ChooseLanguageProps) => {
  const [languageList, setLanguageList] = useState<Array<FlagType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLanguageList = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await LanguageService.getActiveLanguageList();
      setLanguageList(response.data);
    } catch (error) {
      setLanguageList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getLanguageList();
  }, [getLanguageList]);

  if (isLoading) {
    return null;
  }

  return (
    <SelectOP
      position={SelectPositionEnum.BOTTOM_RIGHT}
      customPostLabel="ml-1.5"
      defaultValue={language}
      className={twMerge('border-none')}
      onChange={onChangeLanguage}
    >
      {languageList.map((item) => (
        <OptionOP key={item.code} value={item.code} className="flex w-full">
          <div className="flex w-fit gap-2">
            <img
              src={LanguageService.getFlagURL(item.flag_image)}
              alt={item.name}
              className="mr-px w-6 sm:mr-1"
            />
            <div className="hidden w-max text-sm capitalize sm:block">{item.name}</div>
          </div>
        </OptionOP>
      ))}
    </SelectOP>
  );
};
export default ChooseLanguage;
