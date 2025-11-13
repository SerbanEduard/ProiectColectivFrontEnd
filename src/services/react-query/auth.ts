// queries/auth.ts
import { useMutation } from '@tanstack/react-query'
import { type DtoLoginRequest, type DtoLoginResponse, type DtoSignUpUserRequest, type DtoSignUpUserResponse } from '../../api'
import { useAuthStore } from '../stores/useAuthStore'
import { api } from './api'

export const useSignup = () => {
  return useMutation<DtoSignUpUserResponse, Error, DtoSignUpUserRequest>({
    mutationFn: (data) => api.usersSignupPost(data).then(res => res.data)
  });
};

export const useLogin = () => {
  return useMutation<DtoLoginResponse, Error, DtoLoginRequest>({
    mutationFn: (data) => api.usersLoginPost(data).then(res => res.data),
    onSuccess: (data) => {
      if (!data) return;
      const auth = useAuthStore.getState();
      if (data.accessToken) auth.setToken(data.accessToken);

      if (data.user) auth.setUser(data.user);
      if (data.user)
      {
        auth.setUser(data.user);
        try {
          localStorage.setItem('auth_user', JSON.stringify(data.user));
        } catch {/* ignore quota errors */}
      }
    }
  });
};



