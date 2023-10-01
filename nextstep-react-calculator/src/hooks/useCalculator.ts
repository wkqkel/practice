import { useState } from 'react';
import {
  OPERATORS,
  ERROR_MESSAGES,
  MAX_DIGIT_LENGTH,
} from '../constant/calculator';

const useCalculator = () => {
  const [screenText, setScreenText] = useState('');

  const [left = '', mid = '', right = ''] = screenText
    .split(/([X/+-])/)
    .filter((v) => v);

  const addScreenText = (v: string) => {
    setScreenText((prev) => prev + v);
  };

  const resetScreenText = () => {
    setScreenText('');
  };

  const calculate = () => {
    const res = {
      [OPERATORS.DIVIDE]: Math.floor(+left / +right),
      [OPERATORS.MULTIPLY]: +left * +right,
      [OPERATORS.PLUS]: +left + +right,
      [OPERATORS.MINUS]: +left - +right,
    }[mid];

    if (res === Infinity) {
      setScreenText(ERROR_MESSAGES.INFINITY);
      return;
    }

    setScreenText(res?.toString() || '');
  };

  const check = {
    isNotDigitFirst: mid.length >= 1 || left.length < 1,
    isOverMaxDigitNumber:
      (left.length >= MAX_DIGIT_LENGTH && mid.length <= 0)
      || right.length >= MAX_DIGIT_LENGTH,
  };

  return {
    screenText,
    addScreenText,
    resetScreenText,
    calculate,
    check,
  };
};

export default useCalculator;
