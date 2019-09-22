import React from 'react';
import './Transition.scss';

interface Props {
  children: object;
  customClassNames?: string;
  customTransition?: object;
}

function Transition(props: Props) {
  return (
    <div
      className={`transition-page ${props.customClassNames}`}
    >
      {props.children}
    </div>
  );
}

export default Transition;
