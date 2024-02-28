import { NestRouterDemo } from './NestRouter'
import { VueRouterDemo } from './VueRouterDemo'
export const ReactRouterDemo = () => {
  return (
    <>
      { false && <NestRouterDemo />}
      <VueRouterDemo />
    </>
  )
}
