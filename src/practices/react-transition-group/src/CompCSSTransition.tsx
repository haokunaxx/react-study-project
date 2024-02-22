import { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './CompCSSTransition.css'
const transitionDuration = 1000

export const CompCSSTransitionDemo = () => {
  const helloRef = useRef<HTMLHeadingElement>(null),
    hiRef = useRef<HTMLHeadingElement>(null)

  const [visible, setVisible] = useState(true)

  return (
    <div className='outer'>
      
      {/* <CSSTransition
        appear
        nodeRef={helloRef}
        in={visible}
        timeout={transitionDuration}
      >
        <h1 ref={helloRef}>HELLO! </h1>
      </CSSTransition> */}
      <CSSTransition
        appear
        mountOnEnter
        // unmountOnExit
        nodeRef={helloRef}
        in={visible}
        timeout={transitionDuration}
        classNames='slide'
      >
        <h1 className='inner' ref={helloRef}>
          HELLO!
        </h1>
      </CSSTransition>
      <CSSTransition
        appear
        mountOnEnter
        // unmountOnExit
        nodeRef={hiRef}
        in={!visible}
        timeout={transitionDuration}
        classNames='slide'
      >
        <h1 className='inner' ref={hiRef}>
          Hi!
        </h1>
      </CSSTransition>
      <button onClick={() => setVisible(!visible)}>切换显示状态</button>
    </div>
  )
}
