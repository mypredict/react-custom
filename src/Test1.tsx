import React from 'react';
import { useKeyDown } from './custom_hooks/index';
import { AutoFitImg, Tips } from './components/index';
import './Test1.scss';

interface Props {
  count: number;
  fn: Function;
}

const listenkeyCodes = [13];

const Test1 = (props: Props) => {
  useKeyDown(() => {
    console.log(111)
  }, listenkeyCodes);

  console.log('test1')

  return (
    <div className="test-page">
      {props.count}
      <Tips
        position="follow"
        displayHorn={false}
        title="要点：iOS页素的页面机页面滚动要点：iOS页面非body元素的滚动操作会非常富要
        点：iOS页面非body元素的滚动操作会非常富家大室咖啡机页面滚动要点：iOS页面非body元
        素的滚动操作会非常富家大室咖啡机页面滚动要点：iOS页面非body元素的滚动操作会非常富
        家大室咖啡机页面滚动要点：iOS页面非body元素的滚动操作会非常富家大室咖啡机页面滚动家大室咖啡机页面滚动"
      >
        <div className="img-container">
          <AutoFitImg
            objectFit="cover"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569063351518&di=89a15b592e281ea9a947d1c58588e8b4&imgtype=0&src=http%3A%2F%2Fwww.nieyun.com%2Fwp-content%2Fuploads%2F2011%2F07%2Fchaomengkeaixiaogoutupian1.jpg"
          />
        </div>
      </Tips>
    </div>
  )
}

export default Test1;
