import {useState, useCallback} from 'react'
import axios from 'axios'
import {useStore} from '../store'
import {useHistory} from 'react-router-dom'

type LoginProps = {
  email: string,
  password: string,
}

type ErrorsProps = {
  [key: string]: string[]
} | null

const request = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
})

const useAPI = () => {
  const history = useHistory()
  const {login: storeLogin, logout: storeLogout} = useStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [errors, setErrors] = useState<ErrorsProps>(null)

  const getData = (field: string, defaultValue: any = null) => data && field in data ? data[field] : defaultValue
  const getError = (field: string, defaultValue: any = null) => errors && field in errors ? errors[field] : defaultValue

  const login = useCallback((params: LoginProps) => {
    setLoading(true)
    request.get('/sanctum/csrf-cookie')
      .then(response => {
        request.post('/login', params)
          .then(response => {
            if(response.status === 200 && response.data !== undefined) {
              storeLogin(response.data)
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

  const getTickets = useCallback(params => {
    setLoading(true)
    request.get('/api/ticket', {params})
      .then(response => {
        if(response.data !== undefined) {
          setData(response.data)
        }
      })
      .catch(err => {})
      .then(()=>setLoading(false))
  }, [])

  const gotoTicket = useCallback( id => history.push(`/ticket/${id}`), [history])

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

  const getTicket = useCallback(id => {
    setLoading(true)
    request.get(`/api/ticket/${id}`)
      .then(response => {        
        if(response.data !== undefined) {
          setData(response.data)
        }
      })
      .catch(err => {})
      .then(() => {
        setLoading(false)
      })
  }, [])

  return {loading, errors, getError, login, logout, getTickets, newTicket, getTicket, gotoTicket, getData}
}

export default useAPI