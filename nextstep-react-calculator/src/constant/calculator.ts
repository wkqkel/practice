export const OPERATORS = {
  DIVIDE: '/',
  MULTIPLY: 'X',
  MINUS: '-',
  PLUS: '+',
  EQUAL: '=',
} as const;

export const MODIFIER = 'AC';

export const ERROR_MESSAGES = {
  OVER_DIGIT_NUMBER: '숫자는 세 자리까지만 입력 가능합니다!',
  ENTER_DIGIT_FIRST: '숫자를 먼저 입력한 후 연산자를 입력해주세요!',
  INFINITY: '오류',
};

export const MAX_DIGIT_LENGTH = 3;
export const MAX_DIGIT = 9;
