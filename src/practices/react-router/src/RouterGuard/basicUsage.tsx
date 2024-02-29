import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { Link } from '../Common/LinkWithStyle'
const Home = () => <h1>Home Page</h1>
const User = () => {
  const history = useHistory()
  // 调用history.block后，Router如果没有指定getUserConfirmation, 默认会调用window.confirm让用户进行确认（返回true则继续挑战，返回false阻止跳转）

  const unblock = history.block((location, action) => {
    console.log(location, action)
    // const res = window.confirm(`Are you sure you want to go to ${location.pathname}?`)
    // // return false 会停止跳转
    // if(!res)return false;
    unblock();
    return 'allow to navigate'
  })
  return <h1>User Page</h1>
}

export const RouterGuardDemo = () => {
  return (
    <Router getUserConfirmation={(message, callback) => {
        console.log(message)
        // 调用callback()，参数为false时，会阻止跳转
        if(message === 'allow to navigate') callback(window.confirm('阿巴阿巴'))
    }}>
    {/* <Router> */}
      <div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/user'>User</Link>
        </div>
        <div>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/user' component={User}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}
