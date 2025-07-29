import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollReset = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType(); // 'POP', 'PUSH', or 'REPLACE'

  useEffect(() => {
    // Always scroll to top unless it's a browser back/forward (POP)
    if (navigationType === "POP") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollReset;
