import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'
import { Link } from '../Common/LinkWithStyle'

const getSearchParams = (searchString: string) => {
  return searchString
    .slice(1)
    .split('&')
    .map((item) => item.split('='))
    .reduce((prev, next) => {
      prev[next[0]] = next[1]
      return prev
    }, {} as Record<string, string>)
}

// mock
let isLogin = false

const AuthRoute = (props: Record<string, any>) => {
  console.log('Auth Route')
  const location = useLocation()
  const redirectPath = `/login?to=${location.pathname}`
  return isLogin ? <Route {...props} /> : <Redirect to={redirectPath} />
}

const LoginPage = () => {
  const history = useHistory()
  const location = useLocation()
  const searchParamsObj = getSearchParams(location.search)
  const toPath = searchParamsObj.to || '/login'
  const login = () => {
    isLogin = true
    history.push(toPath)
  }
  return (
    <>
      <h1>Login Page</h1>
      <button onClick={login}>Login</button>
    </>
  )
}
const Public = () => <h1>Public Page</h1>
const Protected = () => <h1>Protected Page</h1>

const UserPublic = () => <h2>UserPublic Page</h2>
const UserProtected = () => <h2>UserProtected Page</h2>

const User = () => {
  console.log('User')
  return (
    <div>
      <h1>User Page</h1>
      <Link to='/user/public'>To UserPublic</Link>
      <Link to='/user/protected'>To UserProtected</Link>
      <Switch>
        <Route path='/user/public' component={UserPublic} />
        <AuthRoute path='/user/protected' component={UserProtected} />
        <Redirect to='/user/public' />
      </Switch>
    </div>
  )
}

export const ProtectedPageDemo = () => {
  console.log('Protected page demo')
  return (
    <Router>
      <div>
        <div>
          <Link to='/public'>To Public Page</Link>
          <Link to='/protected'>To Protected Page</Link>
          <Link to='/user'>To User Page</Link>
        </div>
        <Switch>
          <Route path='/login' component={LoginPage}></Route>
          <Route path='/public' component={Public} />
          <AuthRoute path='/protected' component={Protected} />
          <Route path='/user' component={User} />
          <Redirect to='/public' />
        </Switch>
      </div>
    </Router>
  )
}
