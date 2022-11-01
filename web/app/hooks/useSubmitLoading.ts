import { useTransition } from '@remix-run/react'

const useSubmitLoading = () => {
  const transition = useTransition()

  return ['submitting', 'loading'].includes(transition.state)
}

export default useSubmitLoading
