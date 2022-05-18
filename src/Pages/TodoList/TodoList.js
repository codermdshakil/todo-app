import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const TodoList = () => {

    const [user] = useAuthState(auth);

    console.log(user)

    const handleAddTask = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const des = e.target.des.value;
        const email = user?.email;
        const newTask = { name, des, email };
        console.log(newTask)
        e.target.reset();
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className=' lg:w-1/3 md:w-3/5  w-4/5  bg-white mx-auto p-5 rounded-lg shadow-lg'>
                <div>
                    <h2 className='text-center text-2xl text-secondary font-bold'>Add your new task</h2>
                    <form onSubmit={handleAddTask}>
                        <input type="text" className='w-full my-5 p-4 border-2 border-primary rounded-lg' name='name' placeholder='Enter task name' required /> <br />
                        <textarea style={{ resize: 'none' }} name="des" placeholder='Enter task description' className=' border-2 border-blue-500 w-full h-32 rounded-lg p-4' required></textarea>
                        <button type='submit' className='btn bg-blue-700 text-white'>Add Task <FontAwesomeIcon className='ml-3' icon={faPlus} /> </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodoList;