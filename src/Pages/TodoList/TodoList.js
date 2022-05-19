import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import TaskBox from '../TaskBox/TaskBox';
import './TodoList.css';



const TodoList = () => {

    const [user] = useAuthState(auth);
    const [myTasks, setMyTasks] = useState([]);
    console.log(myTasks);

    useEffect(() => {

        const getTasks = async () => {
            const email = user?.email;
            const url = `https://hidden-basin-20639.herokuapp.com/myTasks?email=${email}`;
            const { data } = await axios.get(url);
            setMyTasks(data)
        }
        getTasks()

    }, [user])



    const handleAddTask = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const des = e.target.des.value;
        const email = user?.email;
        const newTask = { name, des, email };

        fetch('https://hidden-basin-20639.herokuapp.com/mytasks', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        e.target.reset();
    }

    const handleTaskDelete = id => {
        const confirmationMessage = window.confirm('Are you sure to delete this item?');
        if (confirmationMessage) {
            const url = `https://hidden-basin-20639.herokuapp.com/mytasks/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    const newItem = myTasks.filter(item => item._id !== id);
                    setMyTasks(newItem)
                })
        }
    }

    return (
        <section className=' todolist-style ' >
            <div className='flex items-center justify-center'>
                <div className=' lg:w-1/3 md:w-3/5  w-4/5  bg-white form-box mx-auto p-5 rounded-lg shadow-lg'>
                    <div className='form-box'>
                        <h2 className='text-center text-2xl text-secondary font-bold'>Add your new task</h2>
                        <form onSubmit={handleAddTask}>
                            <input type="text" className='w-full my-5 p-4 border-2 border-primary rounded-lg' name='name' placeholder='Enter task name' required /> <br />
                            <textarea style={{ resize: 'none' }} name="des" placeholder='Enter task description' className=' border-2 border-blue-500 w-full h-32 rounded-lg p-4' required></textarea>
                            <button type='submit' className='btn bg-blue-700 text-white'>Add Task <FontAwesomeIcon className='ml-3' icon={faPlus} /> </button>
                        </form>
                    </div>
                </div>
            </div>
            <h2 className='flex items-center justify-center text-center text-2xl text-white py-4 bg-secondary font-bold mb-6 border-x-4'><span className='btn mr-2'></span> Your all Task list</h2>
            <div>
                {
                    myTasks.map(task => <TaskBox key={task._id} task={task} handleTaskDelete={handleTaskDelete} ></TaskBox>)
                }
            </div>
        </section>
    );
};

export default TodoList;