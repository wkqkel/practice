interface InputProps {
  id: string;
  placeholder: string;
  type: string;
  onChange: Function;
  label: string;
  errorMessage?: string;
}

interface PasswordInputProps extends InputProps {
  isSecretPassword: boolean;
  toggleIsSecretPassword: Function;
}
