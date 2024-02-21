import { useState, useRef } from 'react'
import { Transition } from 'react-transition-group'

const transitionDuration = 1000

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

export const CompTransitionDemo = () => {
  const nodeRef = useRef<HTMLHeadingElement>(null)
  const [visible, setVisible] = useState(true)

  return (
    <>
      <Transition
        appear
        nodeRef={nodeRef}
        in={visible}
        timeout={transitionDuration}
      >
        {(state) => {
          console.log(state, transitionStyles[state as keyof typeof transitionStyles])
          return (
            <h1
              ref={nodeRef}
              style={{
                ...{
                  transition: `opacity ${transitionDuration}ms ease-in-out`,
                  opacity: 0
                },
                ...transitionStyles[state as keyof typeof transitionStyles]
              }}
            >
              HELLO WORLD - {state}
            </h1>
          )
        }}
      </Transition>
      <button onClick={() => setVisible(!visible)}>切换显示状态</button>
    </>
  )
}
