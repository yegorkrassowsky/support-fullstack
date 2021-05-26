import {useState, useCallback} from 'react'
import axios from 'axios'
import {useStore} from '../services/store'
import {useHistory} from 'react-router-dom'
import {FormErrorsType} from '../types'

type LoginProps = {
  email: string,
  password: string,
}

export const request = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
})

const useAPI = () => {
  const history = useHistory()
  const {login: storeLogin, logout: storeLogout} = useStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [errors, setErrors] = useState<FormErrorsType>(null)

  const getData = (field: string, defaultValue: any = null) => data && field in data && data[field] !== null ? data[field] : defaultValue

  const login = useCallback((params: LoginProps) => {
    setLoading(true)
    request.get('/sanctum/csrf-cookie')
      .then(response => {
        request.post('/login', params)
          .then(response => {
            if(response.status === 200 && response.data !== undefined) {
              const {userRoles, userName} = response.data
              storeLogin(userRoles, userName)
            } else {
              setLoading(false)
            }
          })
          .catch(err => {
            if(err.response !== undefined && err.response.status === 422 && err.response.data.errors !== undefined){
              setErrors(err.response.data.errors)    
            }
            setLoading(false)
          })
      })
      .catch(() => setLoading(false) )
  }, [storeLogin])
  const logout = useCallback(() => {
    request.post('/logout')
      .then(response => {
        if(response.status === 204){
          storeLogout()
        }
      })
  }, [storeLogout])

  const gotoTicket = useCallback( (id) => history.push(`/ticket/${id}`), [history])

  const newTicket = useCallback(params => {
    setLoading(true)
    request.post('/api/ticket', params)
      .then(response => {
        if(response.data.id !== undefined) {
          gotoTicket(response.data.id)
        }
      })
      .catch(err => {
        if(err.response.data.errors !== undefined){
          setErrors(err.response.data.errors)    
        }
        setLoading(false)
      })
  }, [gotoTicket])

  return {loading, errors, login, logout, newTicket, gotoTicket, getData, setData}
}

export default useAPI