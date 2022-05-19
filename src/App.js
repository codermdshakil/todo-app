import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navber from './Shared/Navber';
import TodoList from './Pages/TodoList/TodoList';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import RequireAuth from './Shared/RequireAuth';


function App() {
  return (
    <div className='app mt-10'>
      <Navber />
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <TodoList />
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
