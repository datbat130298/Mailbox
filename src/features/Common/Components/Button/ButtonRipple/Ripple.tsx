import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { RippleContainer } from './Ripple.styled';

const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction: () => void) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bounce: any = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

interface RippleProp {
  duration: number;
  color: string;
  rippleArray: import('./ButtonRiple').RippleType[];
  onCleanRipple: () => void;
}

const Ripple = ({ duration, color, rippleArray, onCleanRipple }: RippleProp) => {
  useDebouncedRippleCleanUp(rippleArray.length, duration, onCleanRipple);

  return (
    <RippleContainer duration={duration} color={color}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple) => {
          return (
            <span
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
    </RippleContainer>
  );
};

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string,
};

Ripple.defaultProps = {
  duration: 850,
  color: '#fff',
};

export default Ripple;
