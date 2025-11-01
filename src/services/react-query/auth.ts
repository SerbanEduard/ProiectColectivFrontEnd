// queries/auth.ts
import { useMutation } from '@tanstack/react-query'
import { DefaultApi, type DtoSignUpUserRequest, type DtoSignUpUserResponse } from '../../api' // from OpenAPI
import { useAuthStore } from '../stores/useAuthStore'


const api = new DefaultApi();

export const useSignup = () => {
    const store = useAuthStore();


    return useMutation({
        mutationFn: (data : DtoSignUpUserRequest) => api.usersSignupPost(data).then(res => res.data),
        onSuccess: (data: DtoSignUpUserResponse) => {
            store.setUser({...data})
        },
    });
};


