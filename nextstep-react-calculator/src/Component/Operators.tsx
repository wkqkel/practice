import { OPERATORS } from '../constant/calculator';
import { TOperators } from '../types/calculator';

interface IProps {
  onClick: (v: TOperators) => () => void;
}

function Operators({ onClick }: IProps) {
  return (
    <div className="operators subgrid">
      {Object.values(OPERATORS).map((operator) => (
        <button
          key={operator}
          type="button"
          className="operator"
          onClick={onClick(operator)}
        >
          {operator}
        </button>
      ))}
    </div>
  );
}

export default Operators;
