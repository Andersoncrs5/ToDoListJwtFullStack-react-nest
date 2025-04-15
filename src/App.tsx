import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.pag';
import './App.css'
import Login from './pages/Login.pag';
import Register from './pages/Register.pag';
import NotFound from './pages/NotFoundRoute.pag';
import MyTasks from './pages/task/MyTasks.pag';
import CreateTask from './pages/task/createTask.pag';

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

          
      </Routes>
    </Router>
  );
}

export default App