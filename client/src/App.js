
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/User/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from "./store/store"

import TheatreRegistration from './pages/User/TheatreRegistration';
import Theatre from './pages/User/Theatre';
import MovieDetails from './pages/User/MovieDetails';
import Bookshow from './pages/User/Bookshow';
import MyTickets from './pages/User/MyTickets';
import "./query.css"





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
            <Route path='/theatre/registration' element={<ProtectedRoute><TheatreRegistration/></ProtectedRoute>} />
            <Route path='/theatre' element={<ProtectedRoute><Theatre/></ProtectedRoute>} />
            <Route path='/movie/:movieID' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>} />
            <Route path = '/movie/book-show/:id' element={<ProtectedRoute><Bookshow/></ProtectedRoute>} />
            <Route path='/tickets/:id' element={<MyTickets />} />
        </Routes>
        <ToastContainer/>

      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
