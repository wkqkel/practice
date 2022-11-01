interface InputConfig {
  initialValue: string
  validate?(value: string): boolean
}
interface InputProps {
  onBlur(e: React.FocusEvent<HTMLInputElement>): void
  name: string
}

type UseFormParams<T extends string> = Record<T, InputConfig>
type UseFormResult<T extends string> = Record<T, InputProps>

export function useForm<T extends string>(params: UseFormParams<T>) {
  const result: Partial<UseFormResult<T>> = {}
  return result as UseFormResult<T>
}

function useSample() {
  const result = useForm({
    username: { initialValue: '', validate: () => true },
  })

  result.username.initialValue
}

/**
 * useForm({
 *  username:{
 *      initialValue: '',
 *      validate: (value: string) => {}
 *  }
 * })
 */

//  type names = '홍길동' | '둘리' | '마이콜';

//  type humanInfo = Record<names, number>

//  let human:humanInfo = {
//    '홍길동': 20,
//    '둘리': 30,
//    '마이콜': 40
//  };
