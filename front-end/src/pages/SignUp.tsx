import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSignup } from '../hooks/usesignup';

function Signup() {
    const { data, errors, handleSignup, handleOnChange, validateFields, passwordVisisble, showPassword } = useSignup();

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Get started with our eCommerce platform
                        </p>
                    </div>

                    <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200" onSubmit={handleSignup}>
                        <div className="space-y-4">

                            {/* Full Name */}
                            <div>
                                <Input
                                    name="fullName"
                                    value={data.fullName}
                                    placeholder="Full Name"
                                    type="text"
                                    onChange={handleOnChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                            </div>

                            {/* Username */}
                            <div>
                                <Input
                                    name="username"
                                    value={data.username}
                                    placeholder="Username"
                                    type="text"
                                    onChange={handleOnChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <Input
                                    name="email"
                                    value={data.email}
                                    placeholder="Email Address"
                                    type="email"
                                    onChange={handleOnChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Input
                                    name="password"
                                    value={data.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    onChange={handleOnChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <div
                                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                    onClick={passwordVisisble}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                            </div>

                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    to="/sign-in"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Login
                                </Link>
                            </span>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 mt-6 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Signup
                        </Button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Signup;
