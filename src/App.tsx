import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.pag';
import './App.css'
import Login from './pages/Login.pag';
import Register from './pages/Register.pag';
import NotFound from './pages/NotFoundRoute.pag';
import MyTasks from './pages/task/MyTasks.pag';
import CreateTask from './pages/task/createTask.pag';
import UpdateTask from './pages/task/updateTask.pag';
import Profile from './pages/user/profile.pag';
import UpdateUser from './pages/user/update.pag';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        
        <Route path="/task/my-tasks" element={<MyTasks />} />
        <Route path="/task/create-task" element={<CreateTask />} />
        <Route path="/task/uptask-task/:id" element={<UpdateTask />} />

        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/update" element={<UpdateUser />} />
          
      </Routes>
    </Router>
  );
}

export default App