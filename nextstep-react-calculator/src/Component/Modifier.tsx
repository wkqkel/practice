import { MODIFIER } from '../constant/calculator';

interface IProps {
  onClick: () => void;
}

function Modifier({ onClick }: IProps) {
  return (
    <div className="modifiers subgrid">
      <button type="button" className="modifier" onClick={onClick}>
        {MODIFIER}
      </button>
    </div>
  );
}

export default Modifier;
