import React from 'react'
import {connect} from 'react-redux'
import {SetTicketListLimitType, ThunkDispatchType} from '../types'
import {setTicketListLimit} from '../actions/ticketList'
import { IState } from '../interfaces'

type PageLimitProps = {
  currentLimit: number
  setTicketListLimit: SetTicketListLimitType
}

const limits = [10, 25, 50]

const PageLimit: React.FC<PageLimitProps> = ({currentLimit, setTicketListLimit}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketListLimit(+e.target.value)
  }
  const labelText = "Items per page"
  return (
    <div className="page-limit">
      <label htmlFor="pageLimitSelect" className="col-form-label me-2">{labelText}</label>
      <select id="pageLimitSelect" className="form-select w-auto" aria-label={labelText} onChange={changeHandler} value={currentLimit}>
        {limits.map((limit, index) => <option key={index} value={limit}>{limit}</option>)}
      </select>
    </div>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => {
  return {
    setTicketListLimit: (limit: number) => dispatch(setTicketListLimit(limit))
  }
}

export default connect((state: IState) => ({
  currentLimit: state.ticketList.params.limit
}), mapDispatchToProps)(PageLimit)