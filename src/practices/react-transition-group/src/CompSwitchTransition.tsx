import { useState, useRef } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './CompSwitchTransition.css'
// 与vue中的过渡模式类似（https://cn.vuejs.org/guide/built-ins/transition.html#transition-modes）
// 目的是避免同时进行新节点和旧节点的过渡，而是进行有顺序的过渡。
// 即：先进行旧节点的退出过渡，退出过渡完成后再进行新节点的进入过渡（out-in）或先进行新节点的进入过渡，进入过渡完成后再进行旧节点的退出过渡（in-out）
export const CompSwitchTransitionDemo = () => {
  const [flag, setFlag] = useState(true)
  const trueRef = useRef<HTMLHeadingElement>(null)
  const falseRef = useRef<HTMLHeadingElement>(null)
  return (
    <div className='comp-switch-transition-demo-box'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          nodeRef={flag ? trueRef : falseRef}
          in={flag}
          timeout={500}
          classNames='slide'
          key={flag ? 'hello' : 'world'}
        >
          <h1
            ref={flag ? trueRef : falseRef}
            className='comp-switch-transition-demo-h1'
          >
            {flag ? 'Hello' : 'World'}
          </h1>
        </CSSTransition>
      </SwitchTransition>
      <button onClick={() => setFlag(!flag)}>切换状态</button>
    </div>
  )
}
