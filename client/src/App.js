
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from "./store/store"


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter> 
        <Routes>
            <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path='/login' element = {<Login />} />
            <Route path='/register' element = {<Register />} />
            <Route path='/admin' element ={<ProtectedRoute><Admin/></ProtectedRoute>}/>
        </Routes>
        <ToastContainer/>

      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
