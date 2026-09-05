import { useMutation } from "@tanstack/react-query"
import { register , login , googleLogin, Logout} from "../../lib/api"

export const useRegister = () => {
    return useMutation({
        mutationFn : register
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn : Logout
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn : login
    });
};

export const useGoogleLogin = () => {
    return useMutation({
        mutationFn : googleLogin
    });
};