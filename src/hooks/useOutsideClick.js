import { useEffect, useRef } from "react";

function useOutsideClick(close, phase = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close?.();
      }
    }
    document.addEventListener("click", handleClick, phase);

    return () => document.removeEventListener("click", handleClick, phase);
  }, [close, phase]);

  return { ref };
}

export default useOutsideClick;
