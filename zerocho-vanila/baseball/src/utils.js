export const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

export const getRandomFourNumbers = () => {
  const numbers = Array.from({ length: 10 }, (v, i) => i);
  const result = [];

  for (let i = 0; i < 4; i++) {
    const index = getRandomIndex(numbers.length);
    result.push(numbers[index]);
    numbers.splice(index, 1);
  }

  return result.join("");
};
