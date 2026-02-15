import { useState } from "react";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toast";

interface LoginData {
    usernameOrEmail: string;
    password: string;
}
interface LoginErrors {
    usernameOrEmail?: string;
    password?: string;
    login?: string; // generic login error
}

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [data, SetData] = useState<LoginData>({
        usernameOrEmail: "",
        password: ""
    })

    const [errors, setErrors] = useState<LoginErrors>({})
    const [showPassword, setShowPassword] = useState(false);

    const passwordVisible = () => setShowPassword(!showPassword)


    const validateFields = () => {
        const errors: LoginErrors = {};

        if (!data.usernameOrEmail) {
            errors.usernameOrEmail = "Email or Username is required"
            setErrors(errors)
            return false
        } else if (!validator.isEmail(data.usernameOrEmail)) {
            if (!/^[a-zA-Z0-9_]{3,30}$/.test(data.usernameOrEmail)) {
                errors.usernameOrEmail =
                    "Invalid username (use 3-30 letters, numbers, underscores)";
            }

        }

        if (!data.password) {
            errors.password = "Password is required"
            setErrors(errors)
            return false

        }
        setErrors({})
        return true


    }

    const mutation = useMutation<User, Error, LoginData>({
        mutationFn: async (loginData) => {
            const payload = validator.isEmail(loginData.usernameOrEmail)
                ? { email: loginData.usernameOrEmail, password: loginData.password }
                : { username: loginData.usernameOrEmail, password: loginData.password };
            console.time("Login API Request")
            const response = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload),
                credentials: "include"
            });
            console.timeEnd("Login API Request");

            const result = await response.json();

            console.log(result);


            if (!response.ok) throw result
            return result.data.user; 
        },
        onSuccess: (user) => {
            // ✅ Store user in React Query cache

            queryClient.setQueryData(["user"], user);

            if (user.role === "admin") {
                navigate("/admin/dashboard", { replace: true })
            }
            else {
                navigate("/user/dashboard", { replace: true })
            }

        },
        onError: (error) => {
            setErrors({ login: error.message });
        }
    });
    const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields()) {
            mutation.mutate(data)
        }
    }


    const handleonChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        SetData((prev) => ({ ...prev, [name]: value }))


    }
    return {
        data,
        errors,
        handleSignin,
        handleonChange,
        passwordVisible,
        showPassword,
        validateFields,


    }

}