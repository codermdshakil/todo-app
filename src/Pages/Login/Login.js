import React, { useEffect } from 'react';
import Spinner from '../../Shared/Spinner';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import '../../Shared/style.css';



const Login = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";


    useEffect(() => {
        if (gUser || user) {
            navigate(from, { replace: true });
        }
    }, [gUser, user, from, navigate])

    let loginError;

    if (gLoading || loading) {
        return <Spinner />
    }

    if (error || gError) {
        loginError = error?.message || gError?.message;
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
        toast.success('Sign in with Google')
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
        reset()
    }

    return (
        <section className='pageStyle'>
            <div className='flex justify-center items-center h-[100vh]'>
                <div className=" block card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold py-2 ">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name='email'
                                    className="input input-bordered w-full"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid email!!'
                                        }
                                    })} required />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        pattern: {
                                            value: /[0-9a-zA-Z]{6,}/,
                                            message: 'Password should 6 characters or longer!!'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                                <p className='text-sm mb-2'>Forget Password? <span className='text-secondary'><Link to='/resetpassword'>Reset Password </Link> </span> </p>
                            </div>
                            <input className='btn text-white w-full' value="Login" type="submit" />
                        </form>
                        <p className='text-center bg-pink-200 rounded-lg text-red-500'>{loginError && loginError.slice(22, 36)}</p>
                        <p className='text-sm'>Don't have and Account? <span className='text-secondary'> <Link to='/signup'>Create a new Account</Link> </span></p>
                        <div className="divider">OR</div>
                        <div>
                            <button onClick={() => handleSignInWithGoogle()} className='btn btn-outline w-full'>Continue with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;