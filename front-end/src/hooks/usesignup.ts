import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import validator from "validator";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";

interface SignupData {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

interface SignupErrors {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
}

export const useSignup = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [data, setData] = useState<SignupData>({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<SignupErrors>({});


    const passwordVisisble = () => {
        setShowPassword((prev) => !prev);
    };


    const validateFields = (): boolean => {
        const newErrors: SignupErrors = {};

        if (!data.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
            setErrors(newErrors);
            return false;
        }
        if (data.fullName.trim().length < 6) {
            newErrors.fullName = "Full Name must be at least 6 characters long";
            setErrors(newErrors);
            return false;
        }
        if (data.fullName.trim().length > 50) {
            newErrors.fullName = "Full Name cannot exceed 50 characters";
            setErrors(newErrors);
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(data.fullName.trim())) {
            newErrors.fullName = "Full Name can only contain letters and spaces";
            setErrors(newErrors);
            return false;
        }

        if (!data.username.trim()) {
            newErrors.username = "Username is required";
            setErrors(newErrors);
            return false;
        }
        if (data.username.trim().length < 3) {
            newErrors.username = "Username must be at least 3 characters long";
            setErrors(newErrors);
            return false;
        }
        if (data.username.trim().length > 30) {
            newErrors.username = "Username cannot exceed 30 characters";
            setErrors(newErrors);
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(data.username.trim())) {
            newErrors.username =
                "Username can only contain letters, numbers, and underscores";
            setErrors(newErrors);
            return false;
        }

        if (!data.email.trim()) {
            newErrors.email = "Email is required";
            setErrors(newErrors);
            return false;
        }

        if (!validator.isEmail(data.email)) {
            newErrors.email = "Please enter a valid email address";
            setErrors(newErrors);
            return false;
        }

        if (!data.password) {
            newErrors.password = "Password is required";
            setErrors(newErrors);
            return false;
        }

        if (data.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
            setErrors(newErrors);
            return false;
        }
        if (data.password.length > 16) {
            newErrors.password = "Password must be at least 8 characters long";
            setErrors(newErrors);
            return false;
        }
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
        if (!passwordRegex.test(data.password)) {
            newErrors.password =
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };


    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateFields()) return;

        try {
            console.log("Submitting signup data:", data);

            const response = await fetch("/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log("HTTP status:", response.status);
            console.log("Response headers:", response.headers);


            const result = await response.json();
            console.log("Result", result)

            if (response.ok) {
                setData({
                    fullName: "",
                    username: "",
                    email: "",
                    password: "",
                });

                toast.success("Registered Successfully");
                navigate("/sign-in");
            } else {
                toast.error(result.message || "Failed to register");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        data,
        errors,
        showPassword,
        passwordVisisble,
        handleSignup,
        handleOnChange,
        validateFields,
    };
};
