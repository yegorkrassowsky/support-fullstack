import React, {useEffect, useState, useMemo} from 'react'
import {useParams, useLocation, useHistory} from 'react-router-dom'
import Loader from '../components/Loader'
import {ticketStatuses} from '../constants'
import TicketInfo from '../components/TicketInfo'
import Reply from '../components/Reply'
import ResponseList from '../components/ResponseList'
import { useStore } from '../services/store'

const supportedParams = ['page']

type DataQueryProps = {
  page: number
}

const DEFAULT_PAGE = 1

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

  return obj as DataQueryProps;
}

const TicketPage: React.FC = () => {
  const {id: ticketIdParam} = useParams<{id: string}>()
  const ticketId = +ticketIdParam
  const {setTicketPage, ticket} = useStore()
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const {loading: ticketLoading, data: ticketData, responses, totalPages} = ticket
  const agent = ticketData?.agent || null
  const status = ticketData?.status === undefined ? 1 : ticketData?.status
  const [pageReady, setPageReady] = useState<boolean>(false)
  useEffect(()=>{
    if(! pageReady && ! ticketLoading && editorReady) {
      setPageReady(true)
    }
  }, [ticketLoading, editorReady, pageReady])
  const location = useLocation()
  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search])
  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams])
  const currentPage = +queryParams.page
  useEffect(()=>{
    setTicketPage(ticketId, currentPage)
  }, [setTicketPage, ticketId, currentPage])
  const onPageChanged = (page: number) => {
    urlParams.set('page', `${page}`)
    updateURL()
  }
  const history = useHistory()
  const updateURL = () => {
    if (urlParams.get('page') === `${DEFAULT_PAGE}`) {
      urlParams.delete("page");
    }
    history.push({
      pathname: location.pathname,
      search: `?${urlParams}`
    })
  }
  
  const statusText = ticketStatuses[status]
  const statusClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const cardClass = ['card', ...[statusClasses[status]]].join(' ')

  let ticketContainerClass = ['ticket-container']

  if( pageReady ) {
    ticketContainerClass.push('ready')
  }
  
  return (
    <div className="ticket-page">
      <div className="ticket-header main-header">
        <h1>Ticket</h1>
      </div>
      {!pageReady && <Loader />}
      <div className={ticketContainerClass.join(' ')}>
        <div className="row">
          <div className="col-lg-3 order-lg-2">
            <div className="ticket-meta">
              <div className={cardClass}>
                <div className="card-body">
                  <span className="ticket-status">{statusText}</span>
                  <div className="ticket-agent">{agent ? agent : 'Not assigned'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 order-lg-1">
            <TicketInfo />
            {responses.length > 0 && <ResponseList
              data={responses}
              paginationProps={{
                currentPage,
                onPageChanged,
                totalPages,
                pageNeighbours: 1,
              }}
              loading={ticketLoading}
            />}
            <Reply ticketId={ticketId} setEditorReady={() => setEditorReady(true)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPage