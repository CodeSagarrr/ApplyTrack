import { useMutation } from "@tanstack/react-query"
import { register , login , googleLogin} from "../../lib/api"

export const useRegister = () => {
    return useMutation({
        mutationFn : register
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