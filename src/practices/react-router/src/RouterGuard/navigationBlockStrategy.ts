import { match, RouteComponentProps} from 'react-router-dom'

export interface CommonRouterProps {
  history: RouteComponentProps['history']
  location: RouteComponentProps['location']
  match: match
}

export const navigationBlockStrategy = (
  nextLocation: CommonRouterProps['location'],
  prevLocation: CommonRouterProps['location']
) => {
  console.log('navigationBlockStrategy: ', nextLocation, prevLocation)
  return true
}
