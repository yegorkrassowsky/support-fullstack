import {rootReducer} from '../reducers/index'
import {IState} from '../interfaces'
import {ActionType} from '../types'
import axios from 'axios'
import { createStore, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'

export const request = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
})

export const store: Store<IState, ActionType> = createStore(rootReducer, applyMiddleware(thunk))
