import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavigationDelay = (delay = 1000) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [location, delay]);

  return loading;
};

export default useNavigationDelay;
