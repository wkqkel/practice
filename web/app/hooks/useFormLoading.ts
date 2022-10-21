import { useTransition } from '@remix-run/react'

const useFormLoading = () => {
  const transition = useTransition()

  return ['submitting', 'loading'].includes(transition.state)
}

export default useFormLoading
