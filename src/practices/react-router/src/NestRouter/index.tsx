import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Link }  from '../Common/LinkWithStyle'
/*
  路由结构
    - login 
    - user
      - list
      - detail
*/

const Login = () => {
  return <h1>Login Page</h1>
}

const UserList = () => {
  return <h1>UserList Page</h1>
}

const UserDetail = () => {
  return <h1>UserDetail Page</h1>
}

const User = () => {
  return (
    <>
      <h1>User Page</h1>
      <Link to='/user/list'>To UserList Page</Link>
      <Link to='/user/detail'>To UserDetail Page</Link>
      <div>
        <Route path='/user' exact render={() => {
          return <Redirect to='/user/list' />
        }} />
        {/* <Route path='/user' exact component={UserRedirect} /> */}
        <Route path='/user/list' component={UserList} />
        <Route path='/user/detail' component={UserDetail} />
      </div>
    </>
  )
}

export const NestRouterDemo = () => {
  return (
    <div className='nest-router-demo'>
      <Router>
        <Link to='/login'>To Login Page</Link>
        <Link to='/user'>To User Page</Link>
        <hr />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/user' component={User} />
        </Switch>
      </Router>
    </div>
  )
}
