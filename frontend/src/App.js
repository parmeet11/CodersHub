import './App.css';

import { BrowserRouter, Routes , Route, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate';
import Rooms from './pages/rooms/Rooms';
import Room from './pages/Room/Room';
import {useSelector} from 'react-redux';
import { useLoading } from './hooks/useLoading';
import Loader from './components/shared/Loader/Loader';

//const isAuth = false;

//const user = {
  //activated: false,
//}


function App() {

  

  const { loading } = useLoading();

  return loading ? ( <Loader message="Loading...... Please Wait" /> ):(
    <BrowserRouter>

      <Navigation />
        <Routes>
          <Route path="/" exact element={(<GuestRoute><Home /></GuestRoute>)} />
          
          <Route path="/authenticate" element={(<GuestRoute>
            <Authenticate/>
          </GuestRoute>)}/>

          <Route path="/activate" element={(<SemiProtectedRoute>
            <Activate/>
          </SemiProtectedRoute>)}/>

          <Route path="/rooms" element={(<ProtectedRoute>
            <Rooms/>
          </ProtectedRoute>)}/>

          <Route path="/room/:id" element={(<ProtectedRoute>
            <Room/>
          </ProtectedRoute>)}/>


          {/*<Route path="/register" element={<Register />} />
          <Route path="/login"  element={<Login />} />
  */}
             
          
        </Routes>
      
    </BrowserRouter>
  );
}

const GuestRoute = ({children, ...rest}) => {

  const {isAuth} = useSelector((state) => state.auth); //check from store

  return (
    isAuth ? 
          (<Navigate {...rest} to='/rooms' replace  />
          ):(
            children
          )
  );
};

const SemiProtectedRoute = ({children, ...rest}) => {
  const {user, isAuth} = useSelector((state) => state.auth);
  return (
    !isAuth ? 
          (<Navigate {...rest} to='/' replace  />
          ):( /*user login but not upload profile pic and add username */ 
            isAuth && !user.activated ? 
            (children): (<Navigate to='/rooms' replace  />)
          )
  );
};

const ProtectedRoute = ({children, ...rest}) => {

  const {user, isAuth} = useSelector((state) => state.auth);

  return (
    !isAuth ? 
          (<Navigate {...rest} to='/' replace  />
          ):isAuth && !user.activated ?( 
          <Navigate to='/activate' replace  />):
           (children)
          
  );
};









export default App;
