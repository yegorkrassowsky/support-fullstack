import React, {useState} from 'react'
import apiClient from '../services/api'
import {useStore} from '../store'
import InputError from '../components/InputError'

type LoginErrorsProps = {
  email: string[]
  password: string[]
}

const defaultLoginErrors = {email: [], password: []}

const LoginPage: React.FC = () => {
  const {login} = useStore()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<LoginErrorsProps>(defaultLoginErrors)
  const [validated, setValidated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    apiClient.get('/sanctum/csrf-cookie')
    .then(response => {
        apiClient.post('/login', {
            email: email,
            password: password
        }).then(response => {
            if(response.status === 204) {
              login()
            } else {
              setLoading(false)
            }
        }).catch(err => {
          if(typeof err.response.data.errors !== undefined){
            setErrors(prev => ({...defaultLoginErrors, ...err.response.data.errors}))
            setValidated(true)
            setLoading(false)
          }
        })
    })
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
    emailClass.push(errors.email.length ? 'is-invalid' : 'is-valid')
    passwordClass.push(errors.password.length ? 'is-invalid' : 'is-valid')
  }

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={loading}>
        <div className="mb-3">
          <label htmlFor="loginInputEmail" className="form-label">Email address</label>
          <input value={email} onChange={emailHandler} type="email" className={emailClass.join(' ')} id="loginInputEmail" aria-describedby="emailHelp" />
          {errors.email.map((error, index) => <InputError key={index} error={error} />)}
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="loginInputPassword" className="form-label">Password</label>
          <input value={password} onChange={passwordHandler} type="password" className={passwordClass.join(' ')} id="loginInputPassword" />
          {errors.password.map((error, index) => <InputError key={index} error={error} />)}
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