import React from 'react'

type InputErrorsProps = {
  errors: string[]
}

const InputErrors: React.FC<InputErrorsProps> = ({errors}) => {
  return (<>{
    errors.map((error, index) => (<div key={index} className="invalid-feedback">{error}</div>))
  }</>)
}

export default InputErrors
