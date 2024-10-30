//API Liên quan đến XÁC THỰC (LOGIN, REGISTER,...)
import { createContext, useEffect, useReducer, useState } from 'react';

const initial_state = {
   user: null,
   loading: false,
   error: null
};

// Tạo context cho Auth service
export const authService = createContext(initial_state);

// Reducer để quản lý các hành động đăng nhập, đăng ký, và quản lý người dùng
const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            user: null,
            loading: true,
            error: null
         };
      case 'LOGIN_SUCCESS':
         return {
            user: action.payload,
            loading: false,
            error: null
         };
      case 'LOGIN_FAILURE':
         return {
            user: null,
            loading: false,
            error: action.payload
         };
      case 'REGISTER_SUCCESS':
         return {
            user: null,
            loading: false,
            error: null
         };
      case 'LOGOUT':
         return {
            user: null,
            loading: false,
            error: null
         };
      case 'RESET_PASSWORD_START':
         return {
            ...state,
            loading: true,
            error: null
         };
      case 'RESET_PASSWORD_SUCCESS':
         return {
            ...state,
            loading: false,
            error: null
         };
      case 'RESET_PASSWORD_FAILURE':
         return {
            ...state,
            loading: false,
            error: action.payload
         };
      default:
         return state;
   }
};

// Tên hàm đổi thành AuthServiceProvider (bắt đầu bằng chữ hoa)
export const AuthServiceProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initial_state);

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
   }, [state.user]);

   return (
      <authService.Provider value={{
         user: state.user,
         loading: state.loading,
         error: state.error,
         dispatch,
      }}>
         {children}
      </authService.Provider>
   );
};
