import {useState, useCallback} from 'react'
import axios from 'axios'
import {useStore} from '../services/store'
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

  return {loading, errors, login, logout, getData, setData}
}

export default useAPI