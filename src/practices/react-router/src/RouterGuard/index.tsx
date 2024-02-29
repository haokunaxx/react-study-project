import {
  BrowserRouter as Router,
  Route,
  Switch,
  Prompt,
  withRouter,
  type RouteComponentProps
} from 'react-router-dom'
import { Link } from '../Common/LinkWithStyle'
import { useEffect, useState } from 'react'

import {
  navigationBlockStrategy,
  type CommonRouterProps
} from './navigationBlockStrategy'

const Home = () => <h1>Home Page</h1>

const Form = () => {
  return (
    <div>
      <p>name: </p>
      <input type='text' />
    </div>
  )
}
const User = () => {
  return (
    <>
      <h1>User Page</h1>
      <hr />
      <Form />
    </>
  )
}

const Private = () => {
  return <h1>This is Private Page</h1>
}

/*
  vue beforeRouter
*/
interface RouterGuardProps extends RouteComponentProps {
  when: boolean
  navigate: (...params: any[]) => void
  // FIXME: nextLocation的类型
  shouldBlockNavigation: (
    nextLocation: CommonRouterProps['location'],
    prevLocation: CommonRouterProps['location']
  ) => boolean | string | void
  title?: string
  message?: string
  cancelBtnText?: string
  confirmBtnText?: string
}
// type RouteGuardProps = PropsWithChildren<{
//   when: boolean
//   navigate: (...params: any[]) => void
//   // FIXME: nextLocation的类型
//   shouldBlockNavigation: (nextLocation: any) => boolean | string | void
//   title?: string
//   message?: string
//   cancelBtnText?: string
//   confirmBtnText?: string
// }>

const modalWrapperStyle = {
  position: 'fixed' as any,
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  zIndex: 99,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
}
const modalStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  backgroundColor: '#fff'
}
/*
  false => rerender => something operation => true => navigation
*/
const RouterGuard = withRouter((props: RouterGuardProps) => {
  console.log(props)
  const { location, history, match } = props
  const { when, shouldBlockNavigation, navigate } = props
  const {
    title = '',
    message = 'Are you sure you want to leave?',
    cancelBtnText = 'cancel',
    confirmBtnText = 'confirm'
  } = props
  const [modalVisible, setModalVisible] = useState(false)
  const [allowNavigation, setAllowNavigation] = useState(false)
  const [nextLocation, setNextLocation] = useState<
    Record<string, any> | undefined
  >()
  const handleBlockNavigation = (nextLocation: any) => {
    if (!allowNavigation && shouldBlockNavigation(nextLocation, location)) {
      // something operation which needs to update the value of allowNavigation
      setNextLocation(nextLocation)
      setModalVisible(true)
      // Block
      return false
    }
    return true
  }

  const cancelBtnClickHandler = () => {
    setModalVisible(false)
  }

  const confirmBtnClickHandler = () => {
    setModalVisible(false)
    setAllowNavigation(true)
  }

  const RouterGuardConfirmModal = () => (
    <div className='router-guard-block-modal-wrapper' style={modalWrapperStyle}>
      <div className='router-guard-block-modal' style={modalStyle}>
        {title && <div className='modal-title'>{title}</div>}
        <div className='modal-body'>{message}</div>
        <div className='modal-footer'>
          <button onClick={cancelBtnClickHandler}>{cancelBtnText}</button>
          <button onClick={confirmBtnClickHandler}>{confirmBtnText}</button>
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    if (allowNavigation && nextLocation) {
      navigate({ location, history, match }, nextLocation, location)
      setNextLocation(undefined)
      setAllowNavigation(false)
    }
  }, [allowNavigation, navigate, nextLocation, location, history, match])

  return (
    <>
      {/* Prompt, 存在Action（Pop、Push、Replace）才会执行 */}
      <Prompt when={when} message={handleBlockNavigation} />
      {/* window.confirm with message hello */}
      {/* <Prompt when={when} message='hello' />   */}
      {modalVisible && <RouterGuardConfirmModal />}
    </>
  )
})

export const RouterGuardDemo = () => {
  const [whenState, setWhenState] = useState(true)

  return (
    <>
      {/* <Router
        getUserConfirmation={(message, callback) => {
          console.log(message)
          // 调用callback()，参数为false时，会阻止跳转
          if (message === 'allow to navigate')
            callback(window.confirm('阿巴阿巴'))
        }}
      > */}
      <Router>
        <RouterGuard
          when={whenState}
          navigate={({ history }, nextLocation: any, curLocation: any) => {
            if (curLocation.pathname !== nextLocation.pathname) {
              history.push(nextLocation.pathname)
              return
            }
            console.log('same pathname')
          }}
          shouldBlockNavigation={navigationBlockStrategy}
        />
        <div>
          <div>
            <Link to='/'>Home</Link>
            <Link to='/user'>User</Link>
            <Link to='/private'>Private Page</Link>
          </div>
          <div>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/private' component={Private}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}
