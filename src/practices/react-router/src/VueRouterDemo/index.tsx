import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext
} from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Link } from '../Common/LinkWithStyle'
type RouteItem = {
  path: string
  component: () => JSX.Element
  children?: RouteItem[]
}
const RoutesContext = createContext<RouteItem[]>([])

const RouterView = () => {
  const contextRoutes = useContext(RoutesContext)
  const routeList = contextRoutes.map(({ children = [], ...rest }) => (
    <RoutesContext.Provider key={rest.path} value={children}>
      <Route {...rest} />
    </RoutesContext.Provider>
  ))

  //   return <Switch>{routeList}</Switch>;  // TODO:
  return <>{routeList}</>
}

const RoutesProvider = (props: PropsWithChildren<{ routes: any[] }>) => {
  const { routes, children } = props
  const _routes = routes.map((_) => _)

  return (
    <RoutesContext.Provider value={_routes}>{children}</RoutesContext.Provider>
  )
}

const Router = (props: PropsWithChildren<{ routes: any[] }>) => {
  const { routes, children } = props
  return (
    <BrowserRouter>
      <RoutesProvider routes={routes}>{children}</RoutesProvider>
    </BrowserRouter>
  )
}

const Login = () => {
  return <h1>Login Page</h1>
}

const UserList = () => {
  return <h1>UserList Page</h1>
}

const UserDetail = () => {
  return <h1>UserDetail Page</h1>
}

const UserRedirect = () => {
  return <Redirect to='/user/list' />
}

const User = () => {
  return (
    <div>
      <h1>User Page</h1>
      <Link to='/user/list'>To UserList Page</Link>
      <Link to='/user/detail'>To UserDetail Page</Link>
      <RouterView />
    </div>
  )
}

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user',
    component: User,
    children: [
      { path: '/user', exact: true, component: UserRedirect },
      {
        path: '/user/list',
        component: UserList
      },
      {
        path: '/user/detail',
        component: UserDetail
      }
    ]
  }
]

export const VueRouterDemo = () => {
  return (
    <Router routes={routes}>
      <div>
        <Link to='/login'>To Login Page</Link>
        <Link to='/user'>To User Page</Link>
        <RouterView />
      </div>
    </Router>
  )
}
