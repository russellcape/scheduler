import { useState } from "react"

export function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    setHistory([...history, newMode]);
    if (replace === true) {
      setHistory([...history])
    }
  };

  const back = function() {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory([...history.slice(0, history.length - 1)])
    }
  };
  return { mode, transition, back };
};

export default useVisualMode;