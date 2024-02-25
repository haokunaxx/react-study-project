import { useState, createRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { v4 as uuid } from "uuid";
import "./CompTransitionGroup.css";

interface Item {
  id: string;
  label: string;
  nodeRef: any;
}
type List = Item[];

/**
 * 获取给定区间内的随机整数
 * @param {number} left 区间左侧的值
 * @param {number} right 区间右侧的值
 */
// * @param {boolean | undefined} isRightClosedInterval 是否是右闭区间，即生成的随机数是否包含right。默认是true，也就是包含
export const getRandomIntegerBetweenLeftAndRight = (
  left: number,
  right: number
  // isRightClosedInterval?: boolean //是否包含right
): number => {
  // isRightClosedInterval =
  //   typeof isRightClosedInterval === "boolean" ? isRightClosedInterval : true;
  // !isRightClosedInterval && --right;
  return Math.floor(Math.random() * (right - left + 1)) + left;
};

export const CompTransitionGroupDemo = () => {
  const [list, setList] = useState<List>(
    (() =>
      [...Array(10)].map((_, index) => ({
        id: uuid(),
        label: "" + index,
        nodeRef: createRef(),
      })))()
  );

  const getRandomIndex = () => {
    const temp = getRandomIntegerBetweenLeftAndRight(0, list.length);
    console.log(temp, list.length);
    return temp;
  };

  const randomAddition = () => {
    const randIdx = getRandomIndex();
    setList([
      ...list.slice(0, randIdx),
      {
        id: uuid(),
        label: "" + list.length,
        nodeRef: createRef(),
      },
      ...list.slice(randIdx),
    ]);
  };

  const randomDeletion = () => {
    const randIdx = getRandomIndex();
    setList([...list.slice(0, randIdx), ...list.slice(randIdx + 1)]);
  };

  // const randomSort = () => {
  //   setList([...list.sort(() => Math.random() - 0.5)])
  // }

  return (
    <>
      <button style={{ marginRight: "12px" }} onClick={() => randomAddition()}>
        添加
      </button>
      <button onClick={() => randomDeletion()}>删除</button>
      {/* <button onClick={() => randomSort()}>重新排序</button> */}
      <TransitionGroup>
        {list.map((item) => (
          <CSSTransition
            classNames="list"
            nodeRef={item.nodeRef}
            timeout={1000}
            key={item.id}
          >
            <li
              id={item.id}
              className="list-item"
              ref={item.nodeRef}
              key={item.id}
            >
              {item.label}
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};
