import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navber = () => {
    const [user] = useAuthState(auth);

    const handlesignOut = () => {
        signOut(auth)
    }
    return (
        <div>
            <div className="navbar bg-gradient-to-r  from-secondary to-primary  shadow-lg fixed top-0 z-50 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabindex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                    <h2 className="btn btn-ghost normal-case font-bold text-white text-xl">Daily Todo</h2>
                </div>
                <div className="navbar-center hidden lg:flex">
                </div>
                <div className="navbar-end pr-3">
                    {user?.uid ? <button   onClick={handlesignOut} className="btn bg-blue-700 ring-2 ring-white ring-offset-0  text-white">Sign Out <FontAwesomeIcon  className='ml-3' icon={faArrowRightFromBracket} /> </button> : <button onClick={handlesignOut} className="btn   bg-blue-700  ring-2 ring-white ring-offset-0 text-white"><NavLink to='/login'>Login</NavLink></button>}
                </div>
            </div>
        </div>
    );
};

export default Navber;