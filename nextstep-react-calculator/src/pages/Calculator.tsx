/* eslint-disable no-alert */
import '../calculator.css';
import Digits from '../Component/Digits';
import Modifier from '../Component/Modifier';
import Operators from '../Component/Operators';
import ResultScreen from '../Component/ResultScreen';
import useCalculator from '../hooks/useCalculator';
import { ERROR_MESSAGES, OPERATORS } from '../constant/calculator';
import { TOperators } from '../types/calculator';

function Calculator() {
  const {
    screenText, resetScreenText, addScreenText, calculate, check,
  } = useCalculator();

  const onClickDigit = (digit: number) => () => {
    if (check.isOverMaxDigitNumber) {
      alert(ERROR_MESSAGES.OVER_DIGIT_NUMBER);
      return;
    }

    addScreenText(String(digit));
  };

  const onClickModifier = () => {
    resetScreenText();
  };

  const onClickOperator = (operator: TOperators) => () => {
    if (operator === OPERATORS.EQUAL) {
      calculate();
      return;
    }

    if (check.isNotDigitFirst) {
      alert(ERROR_MESSAGES.ENTER_DIGIT_FIRST);
      return;
    }

    addScreenText(operator);
  };

  return (
    <div className="calculator">
      <ResultScreen screenText={screenText} />
      <Digits onClick={onClickDigit} />
      <Modifier onClick={onClickModifier} />
      <Operators onClick={onClickOperator} />
    </div>
  );
}

export default Calculator;
