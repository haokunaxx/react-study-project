import { useState, useRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./CompSwitchTransition.css";
export const CompSwitchTransitionDemo = () => {
  const [flag, setFlag] = useState(true);
  const trueRef = useRef<HTMLHeadingElement>(null);
  const falseRef = useRef<HTMLHeadingElement>(null);
  return (
    <div className="comp-switch-transition-demo-box">
      <SwitchTransition mode="out-in">
        <CSSTransition
          nodeRef={flag ? trueRef : falseRef}
          in={flag}
          timeout={500}
          classNames="slide"
          key={flag ? "hello" : "world"}
        >
          <h1
            ref={flag ? trueRef : falseRef}
            className="comp-switch-transition-demo-h1"
          >
            {flag ? "Hello" : "World"}
          </h1>
        </CSSTransition>
      </SwitchTransition>
      <button onClick={() => setFlag(!flag)}>切换状态</button>
    </div>
  );
};
