import { CompTransitionDemo } from './CompTransition'
import { CompCSSTransitionDemo } from './CompCSSTransition'
import { CompSwitchTransitionDemo } from './CompSwitchTransition'
import { CompTransitionGroupDemo } from './CompTransitionGroup'
import { FlipTransitionDemo, FlipTransition } from './FlipTransition'
export const ReactTransitionGroupDemo = () => {
  return (
    <>
      {false && (
        <>
          <CompTransitionDemo />
          <CompSwitchTransitionDemo />
          <CompCSSTransitionDemo />
          <CompTransitionGroupDemo />
        </>
      )}
      <FlipTransitionDemo />
      {/* <FlipTransition /> */}
    </>
  )
}
