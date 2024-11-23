import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const MAX_RETRIES = 3;

const useUserRole = () => {
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let attempts = 0;

    const fetchRole = () => {
      const token = Cookies.get('accessToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserRole(decoded.role || '');
          setLoading(false);
        } catch (error) {
          console.error("Invalid token:", error);
          if (attempts < MAX_RETRIES) {
            attempts++;
            setTimeout(() => setRetry((prev) => prev + 1), 500);
          } else {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    };

    fetchRole();
  }, [retry]);

  return { userRole, loading };
};

export default useUserRole;
