import { MAX_DIGIT } from '../constant/calculator';

interface IProps {
  onClick: (digit: number) => () => void;
}

const DIGITS = Array.from({ length: MAX_DIGIT + 1 }, (_, i) => MAX_DIGIT - i);

function Digits({ onClick }: IProps) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit) => (
        <button
          key={digit}
          type="button"
          className="digit"
          onClick={onClick(digit)}
        >
          {digit}
        </button>
      ))}
    </div>
  );
}

export default Digits;
