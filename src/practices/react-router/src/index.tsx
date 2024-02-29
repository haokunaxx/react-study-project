import { NestRouterDemo } from './NestRouter'
import { VueRouterDemo } from './VueRouterDemo'
import { ProtectedPageDemo } from './ProtectedPage'
import { RouterGuardDemo } from './RouterGuard'
export const ReactRouterDemo = () => {
  return (
    <>
      {false && <NestRouterDemo />}
      {false && <VueRouterDemo />}
      {false && <ProtectedPageDemo />}
      <RouterGuardDemo />
    </>
  )
}
