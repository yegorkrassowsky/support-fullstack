import React, {useEffect, useMemo} from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import useAPI from '../services/api'
import TicketList from '../components/TicketList'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import PageLimit from '../components/PageLimit'
import StatusFilter from '../components/StatusFilter'
import {ITicket} from '../interfaces'
import {userRoles} from '../constants'
import {useStore} from '../store'

const supportedParams = ['page', 'limit', 'status']

type DataQueryProps = {
  page: number
  limit: number
  status: string
}
const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1
const DEFAULT_STATUS = ''

const getQueryParams = (urlParams: URLSearchParams): DataQueryProps => {
  const obj: any = Array.from(urlParams)
    .filter((param) => supportedParams.includes(param[0]))
    .map((param) => {
      return {
        [param[0]]: param[1]
      };
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const keys = Object.keys(obj);

  if (!keys.includes("page")) {
    obj.page = DEFAULT_PAGE;
  }

  if (!keys.includes("limit")) {
    obj.limit = DEFAULT_LIMIT;
  }

  if (!keys.includes("status")) {
    obj.status = DEFAULT_STATUS;
  }

  return obj as DataQueryProps;
}

const TicketListPage: React.FC = () => {
  const {hasRole} = useStore()
  const {getTickets, getData, loading} = useAPI()
  const tickets: ITicket[] = getData('data', [])
  const totalPages: number = getData('last_page', 1)
  const history = useHistory()
  const location = useLocation()
  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search])
  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams])
  const currentPage = +queryParams.page
  const currentStatus = queryParams.status
  const currentLimit = +queryParams.limit
  const resetCurrentPage = () => onPageChanged(1)
  const onPageChanged = (page: number) => {
    urlParams.set('page', `${page}`)
    updateURL()
  }
  const onStatusChanged = (status: string) => {
    if(status === currentStatus) {
      urlParams.set('status', DEFAULT_STATUS)
    } else {
      urlParams.set('status', status)
    }
    resetCurrentPage()
  }
  const onPageLimitChanged = (limit: number) => {
    urlParams.set('limit', `${limit}`)
    resetCurrentPage()
  }
  const updateURL = () => {
    if (urlParams.get('page') === `${DEFAULT_PAGE}`) {
      urlParams.delete("page");
    }
    if (urlParams.get("limit") === `${DEFAULT_LIMIT}`) {
      urlParams.delete("limit");
    }
    if (urlParams.get("status") === `${DEFAULT_STATUS}`) {
      urlParams.delete("status");
    }
    history.push({
      pathname: location.pathname,
      search: `?${urlParams}`
    })
  }
  const paginationProps = {currentPage, totalPages, onPageChanged, pageNeighbours: 1}  
  const listContainerClass = ['ticket-list-container']
  if(loading) {
    listContainerClass.push('loading')
  }
  useEffect(()=>{
    getTickets(queryParams)
  }, [queryParams, getTickets])
  return (
    <div className="ticket-list-page">
      <div className="ticket-list-header main-header">
        <h1>Tickets</h1>
        {hasRole(userRoles.client) && (
          <div className="d-flex justify-content-end">
            <Link className="btn btn-primary" to='/new-ticket'>New ticket</Link>
          </div>
      )}
        <div className="d-flex justify-content-between my-4">
          <StatusFilter currentStatus={currentStatus} onChange={onStatusChanged} />
          <PageLimit currentLimit={currentLimit} onChange={onPageLimitChanged} />
        </div>
      </div>
      <div className={listContainerClass.join(' ')}>
        {loading ? <Loader /> : '' }
        {tickets.length ? <TicketList tickets={tickets} /> : loading ? '' : <p className="text-center">No tickets found</p> }
      </div>
      <Pagination {...paginationProps} />
    </div>
  )
}

export default TicketListPage