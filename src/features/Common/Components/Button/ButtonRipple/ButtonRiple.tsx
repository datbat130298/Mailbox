import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';
import Button from '../Button';
import Ripple from './Ripple';

interface ButtonRippleProp {
  className: ClassNameValue;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface RippleType {
  x: number;
  y: number;
  size: number;
}

const ButtonRipple = ({ className, onClick, children, style }: ButtonRippleProp) => {
  const [rippleArray, setRippleArray] = useState<RippleType[]>([]);

  const handleClickButton = (event: React.MouseEvent) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  const handleCleanRipple = () => {
    setRippleArray([]);
  };

  return (
    <Button
      className={twMerge('relative', className)}
      onMouseDown={handleClickButton}
      onClick={onClick}
      style={style && style}
    >
      {children}
      <Ripple color="#F3F4F6" duration={1000} rippleArray={rippleArray} onCleanRipple={handleCleanRipple} />
    </Button>
  );
};

export default ButtonRipple;
