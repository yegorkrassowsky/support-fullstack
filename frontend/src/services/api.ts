import {useState, useCallback} from 'react'
import axios from 'axios'
import {useStore} from '../services/store'
import {useHistory} from 'react-router-dom'

type LoginProps = {
  email: string,
  password: string,
}

type ErrorsProps = {
  [key: string]: string[],
} | null

const request = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
})

const useAPI = () => {
  const history = useHistory()
  const {login: storeLogin, logout: storeLogout, setTicketList} = useStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [errors, setErrors] = useState<ErrorsProps>(null)

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

  const getTickets = useCallback(params => {
    setLoading(true)
    request.get('/api/ticket', {params})
      .then(response => {
        if(response.data !== undefined) {
          setTicketList({data: response.data.data, totalPages: response.data.last_page})
        }
      })
      .catch(err => {})
      .then(()=>setLoading(false))
  }, [setTicketList])

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

  const getTicket = useCallback((id, page = 1) => {
    setLoading(true)
    request.get(`/api/ticket/${id}`, {params: {page}})
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

  const newResponse = useCallback((params, addResponse) => {
    setLoading(true)
    request.post('/api/response', params)
      .then(response => {
        if(response.data !== undefined) {
          addResponse(response.data)
        }
        setLoading(false)
        setErrors(null)
      })
      .catch(err => {
        if(err.response.data.errors !== undefined){
          setErrors(err.response.data.errors)    
        }
        setLoading(false)
      })
  }, [])

  const changeStatus = useCallback((id: string, status: number, setTicketData) => {
    setLoading(true)
    request.put(`/api/ticket/${id}`, {status})
      .then(response => {
        if(response.data !== undefined) {
          setTicketData(response.data)
        }
      })
      .catch(err => {})
      .then(() => setLoading(false))
  }, [])
  return {loading, errors, login, logout, getTickets, newTicket, getTicket, newResponse, changeStatus, gotoTicket, getData, setData}
}

export default useAPI