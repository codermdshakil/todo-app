import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const TaskBox = ({ task, handleTaskDelete }) => {

    const [complete, setComplete] = useState(true);
    const {_id , name, des } = task;



    return (
        <div>
            <div className='lg:w-2/5 md:w-3/5  w-5/6 mx-auto rounded-lg bg-white p-5 mb-5'>
                <div className='p-3'>
                    {complete ? <h3 className="text-2xl font-bold">{name}</h3> : <del className="text-2xl font-bold">{name}</del>}
                    {complete ? <h3 className="text-lg">{des}</h3> : <del className="text-lg">{des}</del>}
                </div>
                <div className='flex justify-end items-center'>
                    <button className='btn bg-green-500 my-2 mr-2 text-white border-0' onClick={() => setComplete(false)} >Complete <FontAwesomeIcon className='ml-2 font-bold  ' icon={faCheck} /> </button>
                    <button onClick={() => handleTaskDelete(_id) } className='btn bg-pink-200 text-red-500 border-0 '> Delete<FontAwesomeIcon className='ml-2' icon={faTrashCan} /> </button>
                </div>
            </div>
        </div>
    );

};

export default TaskBox;