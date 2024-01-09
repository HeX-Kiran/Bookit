
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
            <Route path='/' element = {<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/login' element = {<Login />} />
            <Route path='/register' element = {<Register />} />
        </Routes>
        <ToastContainer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
