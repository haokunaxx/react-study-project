import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { getRandomIntegerBetweenLeftAndRight } from "./CompTransitionGroup";
import "./FlipTransition.css";
const FlipTransition = () => {};

export const FlipTransitionDemo = () => {
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const elRef = useRef<HTMLDivElement>(null);
  const oldPosition = useRef({
    left: x,
    top: y,
  });
  const newPosition = {
    left: x,
    top: y,
  };
  useLayoutEffect(() => {
    if (elRef.current) {
      const rect = elRef.current.getBoundingClientRect();
      console.log("useLayoutEffect:", elRef.current.getBoundingClientRect());
      const tranX = oldPosition.current.left - rect.left,
        tranY = oldPosition.current.top - rect.top;
      console.log("useLayoutEffect:", tranX, tranY);
			elRef.current.style.transition = 'none'
      elRef.current.style.transform = `translate3d(${tranX}px, ${tranY}px, 0)`;
    }
  });
  useEffect(() => {
    if (elRef.current) {
      // const rect = elRef.current.getBoundingClientRect();
			setTimeout(() => {
				elRef.current!.style.transition = 'transform 1s'
      	elRef.current!.style.transform = '';
			})
      // console.log(elRef.current.getBoundingClientRect());
      // const tranX = oldPosition.current.left - rect.left,
      //   tranY = oldPosition.current.top - rect.top;
      // console.log(tranX, tranY);
    }
  });
  return (
    <div className="flip-transition-demo">
      <div
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          backgroundColor: "#2c82fd",
          left: newPosition.left + "px",
          top: newPosition.top + "px",
        }}
        ref={elRef}
      ></div>
      <button
        onClick={() => {
          setX(getRandomIntegerBetweenLeftAndRight(60, 500));
          setY(getRandomIntegerBetweenLeftAndRight(60, 500));
        }}
      >
        move
      </button>
    </div>
  );
};
