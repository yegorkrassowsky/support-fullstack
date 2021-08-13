import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/auth'
import { Form, Field } from "react-final-form"
import {GuestClientCredentials, GuestAgentCredentials} from '../constants'
import {IState, ILogin, ILoading, IFormErrors} from '../interfaces'
import {OnLoginType, ThunkDispatchType} from '../types'
import { createFinalFormValidation } from "@lemoncode/fonk-final-form"
import { Validators } from '@lemoncode/fonk'

type LoginPageProps = {
  onLogin: OnLoginType
} & ILoading & IFormErrors

const formValidation = createFinalFormValidation({
  field: {
    email: [Validators.required.validator, Validators.email.validator],
    password: [Validators.required.validator],
  }
})

const LoginPage: React.FC<LoginPageProps> = ({loading, onLogin}) => {
  const submitHandler = (values: ILogin) => onLogin(values)
  const guestClientHandler = (e: React.MouseEvent) => {
    onLogin({email: GuestClientCredentials.EMAIL, password: GuestClientCredentials.PASS})
  }
  const guestAgentHandler = (e: React.MouseEvent) => {
    onLogin({email: GuestAgentCredentials.EMAIL, password: GuestAgentCredentials.PASS})
  }

  return (
    <div className="login-page">
      <div className="main-header login-header">
        <h1>Login</h1>
      </div>
      <div className="login-container">
        <Form
          onSubmit={submitHandler}
          initialValues={{
            email: '',
            password: '',
          }}
          validate={(values) => formValidation.validateForm(values)}
          render={({ handleSubmit, submitError }) => {
            return (
              <form onSubmit={handleSubmit}>
                <fieldset disabled={loading}>
                  <Field name="email">
                    {({input, meta}) => {
                      const touched = meta.touched || meta.submitFailed
                      const error = meta.error || meta.submitError
                      let inputClass = ['form-control']
                      if(touched) {
                        inputClass.push(error ? 'is-invalid' : 'is-valid')
                      }
                      return (
                        <div className="mb-3">
                          <label htmlFor="loginInputEmail" className="form-label">Email address</label>
                          <input id="loginInputEmail" className={inputClass.join(' ')} aria-describedby="emailHelp" {...input} />
                          {touched && error && <div className="invalid-feedback">{error}</div>}
                          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                    )}}
                  </Field>
                  <Field name="password" type="password">
                    {({input, meta}) => {
                      const touched = meta.touched || meta.submitFailed
                      const error = meta.error || meta.submitError
                      let inputClass = ['form-control']
                      if(touched) {
                        inputClass.push(error ? 'is-invalid' : 'is-valid')
                      }
                      return (
                        <div className="mb-3">
                          <label htmlFor="loginInputPassword" className="form-label">Password</label>
                          <input id="loginInputPassword" className={inputClass.join(' ')} {...input} />
                          {touched && error && <div className="invalid-feedback">{error}</div>}
                        </div>
                      )
                    }}
                  </Field>
                  {submitError && <div className="invalid-feedback d-block mb-3">{submitError}</div>}
                  <div className="d-grid gap-3">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
                    </button>
                    <div className="guest-login-text">or login as</div>
                    <button onClick={guestClientHandler} className="btn btn-warning" type="button" disabled={loading}>Guest client</button>
                    <button onClick={guestAgentHandler} className="btn btn-success" type="button" disabled={loading}>Guest agent</button>
                  </div>
                </fieldset>
              </form>
            )
          }}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  onLogin: (credentials: ILogin) => {
    return dispatch(login(credentials))
  }
})

export default connect((state: IState) => ({
  loading: state.auth.login.loading,
}), mapDispatchToProps)(LoginPage)