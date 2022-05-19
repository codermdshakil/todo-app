import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useLoadData = () => {
    const [myTasks, setMyTasks] = useState([]);
    const [user] = useAuthState(auth);
    console.log(myTasks);

    useEffect(() => {
        const getTasks = async () => {
            const email = user?.email;
            const url = `https://hidden-basin-20639.herokuapp.com/myTasks?email=${email}`;
            const { data } = await axios.get(url);
            setMyTasks(data)
        }
        getTasks()

    }, [user]);

    return [myTasks, setMyTasks];

};

export default useLoadData;