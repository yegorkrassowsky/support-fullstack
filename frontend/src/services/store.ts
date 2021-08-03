import {rootReducer} from '../reducers/index'
import {IState} from '../interfaces'
import {ActionType} from '../types'
import axios from 'axios'
import { createStore, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export const store: Store<IState, ActionType> = createStore(rootReducer, applyMiddleware(thunk))
