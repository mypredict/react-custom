import { useEffect } from 'react';

function useKeyDown(callback: Function, keyCodes: Array<number>): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keyCodes.includes(event.keyCode) && callback();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callback, keyCodes]);
}

export default useKeyDown;
