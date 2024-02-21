import { CompTransitionDemo } from "./CompTransition";
import { CompCSSTransitionDemo } from "./CompCSSTransition";
import { CompSwitchTransitionDemo } from "./CompSwitchTransition";
export const ReactTransitionGroupDemo = () => {
  return (
    <>
      {false && (
        <>
          <CompTransitionDemo />
          <CompCSSTransitionDemo />
        </>
      )}
      <CompSwitchTransitionDemo />
    </>
  );
};
