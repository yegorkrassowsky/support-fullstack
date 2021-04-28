import React from 'react'

type InputErrorProps = {
  error: string
}

const InputError: React.FC<InputErrorProps> = ({error}) => <div className="invalid-feedback">{error}</div>

export default InputError
