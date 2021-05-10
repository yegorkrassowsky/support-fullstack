import React, {useEffect, useState} from 'react'
import useAPI from '../services/api'
import InputErrors from '../components/InputErrors'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validated, setValidated] = useState<boolean>(false)
  const {loading, errors, getError, login} = useAPI()
  useEffect(()=>{
    if(!loading && errors) {
      setValidated(true)
    }
  }, [loading, errors])
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    login({email, password})    
  }
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  let emailClass = ['form-control']
  let passwordClass = ['form-control']

  if(validated) {
    emailClass.push(getError('email') ? 'is-invalid' : 'is-valid')
    passwordClass.push(getError('password') ? 'is-invalid' : 'is-valid')
  }
  
  const emailErrors = getError('email') ? <InputErrors errors={errors!.email} /> : null
  const passwordErrors = getError('password') ? <InputErrors errors={errors!.password} /> : null

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={loading}>
        <div className="mb-3">
          <label htmlFor="loginInputEmail" className="form-label">Email address</label>
          <input value={email} onChange={emailHandler} type="email" className={emailClass.join(' ')} id="loginInputEmail" aria-describedby="emailHelp" />
          {emailErrors}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="loginInputPassword" className="form-label">Password</label>
          <input value={password} onChange={passwordHandler} type="password" className={passwordClass.join(' ')} id="loginInputPassword" />
          {passwordErrors}
        </div>
        {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
            </button>) : (
            <button type="submit" className="btn btn-primary">Login</button>
        )}
      </fieldset>
      
    </form>
  )
}

export default LoginPage