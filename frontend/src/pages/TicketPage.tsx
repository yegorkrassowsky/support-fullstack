import React, {useEffect, useState, useMemo} from 'react'
import {useParams, useLocation, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Loader from '../components/Loader'
import CONSTANTS, {ticketStatuses} from '../constants'
import TicketInfo from '../components/TicketInfo'
import Reply from '../components/Reply'
import ResponseList from '../components/ResponseList'
import {addResponse, changeStatus, setAddResponseErrors, setTicketPage} from '../actions/ticket'
import {IState, ITicketState} from '../interfaces'
import {ThunkDispatchType, SetErrorsType, FormErrorsType, SetTicketPageType, ChangeStatusType, AddResponseType} from '../types'

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

type TicketPageProps = {
  ticket: ITicketState
  setTicketPage: SetTicketPageType
  addResponse: AddResponseType
  addResponseErrors: SetErrorsType
  changeStatus: ChangeStatusType
}

const TicketPage: React.FC<TicketPageProps> = ({ticket, setTicketPage, addResponse, addResponseErrors, changeStatus}) => {
  const {id: ticketIdParam} = useParams<{id: string}>()
  const ticketId = +ticketIdParam
  useEffect(()=>{
    addResponseErrors(null)
  }, [addResponseErrors])
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const {loading, data, responses, totalPages} = ticket
  const agent = data?.agent || ''
  const status = data?.status ? data.status : 0
  const [pageReady, setPageReady] = useState<boolean>(false)
  useEffect(()=>{
    if(! pageReady && ! loading && editorReady) {
      setPageReady(true)
    }
  }, [loading, editorReady, pageReady])
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
  const cardClass = ['card', statusClasses[status]].join(' ')

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
                  <div className="ticket-agent">{agent ? agent : CONSTANTS.NOT_ASSIGNED_TICKET_STATUS}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 order-lg-1">
            {data && <TicketInfo ticket={data} loading={ticket.changeStatusLoading} changeStatus={changeStatus} />}
            {responses.length > 0 && <ResponseList
              data={responses}
              paginationProps={{
                currentPage,
                onPageChanged,
                totalPages,
                pageNeighbours: 1,
              }}
              loading={loading}
            />}
            <Reply
              ticketId={ticketId}
              formData={ticket.addResponse}
              addResponse={addResponse}
              setEditorReady={() => setEditorReady(true)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  setTicketPage: (ticketId: number, page: number) => dispatch(setTicketPage(ticketId, page)),
  changeStatus: (ticketId: number, status: number) => dispatch(changeStatus(ticketId, status)),
  addResponse: (ticketId: number, content: string, callback: Function) => dispatch(addResponse(ticketId, content, callback)),
  addResponseErrors: (errors: FormErrorsType) => dispatch(setAddResponseErrors(errors)),
})

export default connect((state: IState) => ({
  ticket: state.ticket,
}), mapDispatchToProps)(TicketPage)
