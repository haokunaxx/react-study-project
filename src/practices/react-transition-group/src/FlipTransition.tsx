import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  PropsWithChildren
} from 'react'
import { getRandomIntegerBetweenLeftAndRight } from './CompTransitionGroup'
import './FlipTransition.css'
import { v4 as uuid } from 'uuid'

// function useShuffle() {
//   const [, forceUpdate] = useState({})
//   const shuffle = useCallback(() => {
//     forceUpdate({})
//   }, [])
//   return [shuffle]
// }

const Item = (props: PropsWithChildren<{ label: string }>) => {
  const { children } = props
  const firstRef = useRef<boolean>(true)
  const elRef = useRef<HTMLDivElement>(null)
  const oldLayoutInfo = useRef<{ left: number; top: number } | null>(null)
  const isTransition = useRef<boolean>(false)
  // 打断动画时记录此刻节点信息
  if (isTransition.current) {
    if (elRef.current) {
      const data = elRef.current.getBoundingClientRect()
      // console.log(window.getComputedStyle(elRef.current).transform)
      elRef.current.style.transition = 'none' //停止过渡,清除节点之前的的偏移，不清除的话会在目标位置加上偏移（打开上一行的log和useEffectLayout中的log）
      oldLayoutInfo.current = {
        left: data.left,
        top: data.top
      }

      // label === '0' && console.log(label, data.left)
      isTransition.current = false
    }
  }
  useLayoutEffect(() => {
    if (elRef.current) {
      const data = elRef.current?.getBoundingClientRect()
      // 第一次挂载时讲当前节点状态保存为上一次节点状态
      if (firstRef.current) {
        isTransition.current = false
        oldLayoutInfo.current = {
          left: data.left,
          top: data.top
        }
        firstRef.current = false
        return
      }
      // 通过当前节点状态和上一次节点状态计算当前节点发生的变化信息，并通过设置css立即恢复至上一次节点的状态。恢复完将上一次节点的状态使用当前节点的状态更新。
      if (oldLayoutInfo.current) {
        const tranX = oldLayoutInfo.current.left - data.left,
          tranY = oldLayoutInfo.current.top - data.top
        // console.log(window.getComputedStyle(elRef.current).transform)
        elRef.current.style.transition = 'none'
        elRef.current.style.transform = `translate3d(${tranX}px, ${tranY}px, 0)`
        oldLayoutInfo.current = {
          left: data.left,
          top: data.top
        }
      }
    }
  })
  // 恢复至上一次节点的状态后，去除设置的css、添加transition，让节点回到新的状态模拟过渡动画
  useEffect(() => {
    setTimeout(() => {
      if (elRef.current) {
        isTransition.current = true
        elRef.current.style.transition = 'transform 1s'
        elRef.current.style.transform = ''
      }
    })
  })
  return <div ref={elRef}>{children}</div>
}

export const FlipTransitionDemo = () => {
  const [list, setList] = useState<{ label: string; id: string }[]>(
    [...Array(30)].map((_, index) => ({
      label: '' + index,
      id: uuid()
    }))
  )
  const shuffleBtnClickHandler = () => {
    setList([...list.sort(() => Math.random() - 0.5)])
    // setList([list[2], list[0], list[1]])
    // setList([list[1], list[0]])
  }
  return (
    <div>
      <div
        className='test'
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: 'pink',
          transform: 'translate3d(1000px, 1000px, 0)',
          transition: 'all 20s'
        }}
      ></div>
      <button onClick={shuffleBtnClickHandler}>shuffle</button>
      <div className='list-box'>
        {list.map(({ id, label }) => (
          <Item key={id} label={label}>
            <div
              key={id}
              className='list-item'
              // style={{ opacity: label === '0' ? '0' : '1' }}
            >
              {label}
            </div>
          </Item>
        ))}
      </div>
    </div>
  )
}

export const FlipTransition = () => {
  const [x, setX] = useState(100)
  const [y, setY] = useState(100)
  const elRef = useRef<HTMLDivElement>(null)
  const oldPosition = useRef({
    left: 0,
    top: 0
  })

  const moveBtnClickHandler = () => {
    if (elRef.current) {
      const rect = elRef.current.getBoundingClientRect()
      oldPosition.current.left = rect.left
      oldPosition.current.top = rect.top
    }
    setX(getRandomIntegerBetweenLeftAndRight(60, 500))
    setY(getRandomIntegerBetweenLeftAndRight(60, 500))
  }

  useLayoutEffect(() => {
    if (elRef.current) {
      const tranX = oldPosition.current.left - x,
        tranY = oldPosition.current.top - y

      elRef.current.style.transition = 'none'
      elRef.current.style.transform = `translate3d(${tranX}px, ${tranY}px, 0)`
    }
  })
  useEffect(() => {
    if (elRef.current) {
      setTimeout(() => {
        elRef.current!.style.transition = 'transform 300ms'
        elRef.current!.style.transform = ''
      })
    }
  })

  return (
    <div className='flip-transition-demo'>
      <div
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          backgroundColor: '#2c82fd',
          left: x + 'px',
          top: y + 'px'
        }}
        ref={elRef}
      ></div>
      <button onClick={moveBtnClickHandler}>move</button>
    </div>
  )
}
