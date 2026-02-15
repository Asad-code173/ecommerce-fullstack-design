import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useLogin } from '../hooks/useSignin';

function SignIn() {
    const { data, errors, handleSignin, handleonChange, validateFields, showPassword,passwordVisible} = useLogin();

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Login your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Get started with our eCommerce platform
                        </p>
                    </div>

                    <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200" onSubmit={handleSignin}>
                        <div className="space-y-4">

                           

                            {/* Username */}
                            <div>
                                <Input
                                    name="usernameOrEmail"
                                    value={data.usernameOrEmail}
                                    placeholder="Username or email"
                                    type="text"
                                    onChange={handleonChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.usernameOrEmail ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.usernameOrEmail && <p className="text-sm text-red-500 mt-1">{errors.usernameOrEmail}</p>}
                            </div>


                            {/* Password */}
                            <div className="relative">
                                <Input
                                    name="password"
                                    value={data.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    onChange={handleonChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <div
                                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                    onClick={passwordVisible}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                            </div>

                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-600">
                                Don'y have an account?{' '}
                                <Link
                                    to="/sign-up"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Create-account
                                </Link>
                            </span>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 mt-6 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Login
                        </Button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default SignIn;
