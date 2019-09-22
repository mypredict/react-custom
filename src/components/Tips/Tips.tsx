import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Transition from '../Transition/Transition';
import './Tips.scss';

type FixedPosition = 'top' | 'right' | 'bottom' | 'left';
type Position = 'top' | 'right' | 'bottom' | 'left' | 'auto' | 'follow';

interface Props {
  children: object;
  title: string;
  position?: Position;
  rootStyle?: object;
  displayHorn?: boolean;
  hornColor?: string;
}

interface TipsContainer {
  offsetWidth: number;
  offsetHeight: number;
  offsetTop: number;
  offsetLeft: number;
}

function computePosition(tipsContainer: TipsContainer): FixedPosition {
  const { clientWidth, clientHeight, scrollTop, scrollLeft } = document.documentElement;
  const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = tipsContainer;

  const tipsTopSpacing = offsetTop - scrollTop;
  const tipsBottomSpacing = clientHeight - tipsTopSpacing - offsetHeight;
  const tipsLeftSpacing = offsetLeft - scrollLeft - 100;
  const tipsRightSpacing = clientWidth - tipsLeftSpacing - offsetWidth - 150;

  switch(Math.max(tipsTopSpacing, tipsRightSpacing, tipsBottomSpacing, tipsLeftSpacing)) {
    case tipsTopSpacing: return 'top';
    case tipsRightSpacing: return 'right';
    case tipsBottomSpacing: return 'bottom';
    case tipsLeftSpacing: return 'left';
    default: return 'right';
  }
}

function Tips(props: Props) {
  const tipsContainer = useRef(null);

  const [displayTips, setDisplayTips] = useState(false);
  const [tipsPosition, setTipsPosition] = useState(['', '']);
  const [followPosition, setFollowPosition] = useState({});
  function handleMouseMove(event: MouseEvent) {
    if (props.position === 'follow') {
      const { clientX, clientY } = event;
      setFollowPosition({
        top: `${clientY + 20}px`,
        left: `${clientX + 10}px`
      });
    }
  }

  function handleMouseEnter() {
    setDisplayTips(true);
    if (props.position === 'auto') {
      const tipsContainerSelf: any = tipsContainer.current
        ? tipsContainer.current
        : { offsetWidth: 0, offsetHeight: 0, offsetTop: 0, offsetLeft: 0 };
      const fixedPosition: FixedPosition = computePosition(tipsContainerSelf);
      setTipsPosition([`tips-content-${fixedPosition}`, `horn-${fixedPosition}`]);
    }
  }

  useEffect(() => {
    switch(props.position) {
      case 'top': setTipsPosition(['tips-content-top', 'horn-top']); break;
      case 'right': setTipsPosition(['tips-content-right', 'horn-right']); break;
      case 'bottom': setTipsPosition(['tips-content-bottom', 'horn-bottom']); break;
      case 'left': setTipsPosition(['tips-content-left', 'horn-left']); break;
      case 'follow': setTipsPosition(['', 'horn-follow-bottom']); break;
      default: setTipsPosition(['', '']);
    }
  }, [props.position]);

  return (
    <div
      ref={tipsContainer}
      className="tips-page"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setDisplayTips(false)}
      onMouseMove={handleMouseMove}
    >
      {
        props.title && displayTips && (
          <Transition>
            <div
              className={`tips-content ${tipsPosition[0]}`}
              style={{
                ...props.rootStyle,
                ...followPosition,
                borderColor: props.hornColor,
                position: props.position === "follow" ? "fixed" : "absolute"
              }}
            >
              {
                props.displayHorn &&
                  <div className={`horn ${tipsPosition[1]}`}></div>
              }
              {props.title}
            </div>
          </Transition>
        )
      }
      {props.children}
    </div>
  );
}

Tips.defaultProps = {
  position: 'auto',
  displayHorn: true
};

export default Tips;
