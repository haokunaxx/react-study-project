import { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './CompCSSTransition.css'
const transitionDuration = 1000

export const CompCSSTransitionDemo = () => {
  const nodeRef = useRef<HTMLHeadingElement>(null)
  const [visible, setVisible] = useState(true)

  return (
    <>
      <CSSTransition
        appear
        nodeRef={nodeRef}
        in={visible}
        timeout={transitionDuration}
      >
        <h1 ref={nodeRef}>HELLO WORLD </h1>
      </CSSTransition>
      <button onClick={() => setVisible(!visible)}>切换显示状态</button>
    </>
  )
}
