import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { updateUser } from '../slices/authSlice';
import { BASE_URL } from '../constants/data';
import Cookie from 'js-cookie';
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = Cookie.get('token'); 

  useEffect(() => {
    if (!user && token) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${BASE_URL}api/v1/user/me/${token}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(updateUser(res.data));
        } catch (err) {
          console.error(err);
          router.push('/login');
        }
      };

      fetchUser();
    } else if (!token) {
      router.push('/login');
    }
  }, [user, token, dispatch, router]);

  if (!user) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
