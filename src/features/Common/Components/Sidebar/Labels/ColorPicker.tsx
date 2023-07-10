import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

interface ColorPickerProps {
  setColorPicker: Dispatch<SetStateAction<string>>;
}

const ColorPicker = ({ setColorPicker }: ColorPickerProps) => {
  const colorListDefault = [
    {
      id: 1,
      value: '#0048BA',
    },
    {
      id: 2,
      value: '#B0BF1A',
    },
    {
      id: 3,
      value: '#7CB9E8',
    },
    {
      id: 4,
      value: '#B284BE',
    },
    {
      id: 5,
      value: '#72A0C1',
    },
    {
      id: 6,
      value: '#DB2D43',
    },
    {
      id: 7,
      value: '#C46210',
    },
    {
      id: 8,
      value: '#EFDECD',
    },
    {
      id: 9,
      value: '#9F2B68',
    },
    {
      id: 10,
      value: '#F19CBB',
    },
    {
      id: 11,
      value: '#FFBF00',
    },
    {
      id: 12,
      value: '#9966CC',
    },
    {
      id: 13,
      value: '#665D1E',
    },
    {
      id: 14,
      value: '#FBCEB1',
    },
    {
      id: 15,
      value: '#FDEE00',
    },
  ];

  return (
    <div className=" grid grid-cols-5 gap-[1px] p-3 py-1.5">
      {colorListDefault.map((color) => (
        <div className="col-span-1 flex items-center justify-center pb-0.5">
          <div
            className={twMerge('mb-0.5 flex h-5 w-5 rounded-full', `bg-[${color.value}]`)}
            role="button"
            tabIndex={0}
            key={color.id}
            onClick={() => setColorPicker(color.value)}
          >
            {' '}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
