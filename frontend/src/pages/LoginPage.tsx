import React, {useState} from 'react'
import {useStore} from '../services/store'
import InputErrors from '../components/InputErrors'

const LoginPage: React.FC = () => {
  const {auth: {login: {loading, errors}}, login} = useStore()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const emailErrors = errors?.email || null
  const passwordErrors = errors?.password || null

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

  if(errors) {
    emailClass.push(emailErrors ? 'is-invalid' : 'is-valid')
    passwordClass.push(passwordErrors ? 'is-invalid' : 'is-valid')
  }

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={loading}>
        <div className="mb-3">
          <label htmlFor="loginInputEmail" className="form-label">Email address</label>
          <input value={email} onChange={emailHandler} type="email" className={emailClass.join(' ')} id="loginInputEmail" aria-describedby="emailHelp" />
          {emailErrors && <InputErrors errors={emailErrors} />}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="loginInputPassword" className="form-label">Password</label>
          <input value={password} onChange={passwordHandler} type="password" className={passwordClass.join(' ')} id="loginInputPassword" />
          {passwordErrors && <InputErrors errors={passwordErrors} />}
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