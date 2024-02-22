import { useState, createRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { v4 as uuid } from 'uuid'
import './CompTransitionGroup.css'

interface Item {
  id: string
  label: string
  nodeRef: any
}
type List = Item[]

export const CompTransitionGroupDemo = () => {
  const [list, setList] = useState<List>(
    (() =>
      [...Array(10)].map((_, index) => ({
        id: uuid(),
        label: '' + index,
        nodeRef: createRef()
      })))()
  )

  const getRandomIndex = () => Math.round(Math.random() * list.length)

  const randomAddition = () => {
    const randIdx = getRandomIndex()
    setList([
      ...list.slice(0, randIdx),
      {
        id: uuid(),
        label: '' + list.length,
        nodeRef: createRef()
      },
      ...list.slice(randIdx)
    ])
  }

  const randomDeletion = () => {
    const randIdx = getRandomIndex()
    setList([...list.slice(0, randIdx), ...list.slice(randIdx + 1)])
  }

  const randomSort = () => {
    setList([...list.sort(() => Math.random() - 0.5)])
  }
  return (
    <>
      <button onClick={() => randomAddition()}>添加</button>
      <button onClick={() => randomDeletion()}>删除</button>
      <button onClick={() => randomSort()}>重新排序</button>
      <TransitionGroup>
        {list.map((item) => (
          <CSSTransition
            classNames='list'
            nodeRef={item.nodeRef}
            timeout={1000}
            key={item.id}
          >
            <li id={item.id} className='list-item' ref={item.nodeRef} key={item.id}>
              <span className='list-item-inner'> {item.label}</span>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  )
}
