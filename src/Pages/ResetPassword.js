import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner';

const ResetPassword = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    if (sending) {
        return <Spinner />
    }

    let errorMessage;

    if (error) {
        errorMessage = error?.message;
    }

    const onSubmit = data => {
        sendPasswordResetEmail(data?.email);
        reset();
        toast.success('Sent Email')
    }



    return (
        <div className='flex items-center justify-center h-[80vh]'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">

                    <div className='flex items-start'>
                        <div className="tooltip" data-tip="login">
                            <button className=' font-bold '> <Link to='/login'><FontAwesomeIcon icon={faAngleLeft} /></Link> </button>
                        </div>
                    </div>

                    <h2 className='text-secondary font-bold text-2xl text-center'>Reset Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
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
                            {errorMessage && <p className='text-sm bg-pink-300 text-red-500 mb-2 rounded-lg text-center'>{errorMessage}</p>}
                        </div>
                        <input className='btn w-full text-white' value='Reset Password' type="submit" />
                    </form>
                </div>
            </div >
        </div>
    );
};

export default ResetPassword;