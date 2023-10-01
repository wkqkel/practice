interface IProps {
  screenText: string;
}

function ResultScreen({ screenText }: IProps) {
  return <h1 id="total">{screenText || 0}</h1>;
}

export default ResultScreen;
