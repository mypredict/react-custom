import React, { useState, useCallback } from 'react';
import Test1 from './Test1';
import './App.scss';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const aa = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div className="App">
      <Test1 count={count} fn={aa} />
    </div>
  );
}

export default App;
