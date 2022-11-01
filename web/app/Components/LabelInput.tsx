import { forwardRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'
import Input, { type Props as InputProps } from './Input'

interface Props extends InputProps {
  label: string
}

const LabelInput = forwardRef<HTMLInputElement, Props>(
  ({ label, onBlur, onFocus, ...rest }: Props, ref) => {
    const [focused, setFocused] = useState(false)
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e)
      setFocused(true)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)
      setFocused(false)
    }

    return (
      <Block>
        <Label focused={focused}>{label}</Label>
        <Input onFocus={handleFocus} onBlur={handleBlur} {...rest} ref={ref}/>
      </Block>
    )
  },
)

LabelInput.displayName = 'LabelInput'

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label<{ focused?: boolean }>`
  font-size: 16px;
  line-height: 1.5; // 피그마 150%
  color: ${colors.gray4};
  font-weight: 600;
  margin-bottom: 8px;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`

export default LabelInput
